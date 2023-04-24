import { resolve, join, basename, extname } from 'node:path'
import { promises as fsp, existsSync } from 'node:fs'
import * as yml from 'js-yaml'
import { globby } from 'globby'
import defu from 'defu'
import { categories } from './categories.js'
import { ModuleInfo } from './types.js'
import { fetchGithubPkg, modulesDir, distDir, distFile } from './utils.js'

export async function sync (name, repo?: string, isNew = false) {
  const module = await getModule(name)

  // Repo
  if (repo) {
    module.repo = repo
  }

  if (!module.repo) {
    throw new Error(`repo not provided for ${name}`)
  }

  // Defaults
  if (!module.repo) {
    module.repo = repo
  }
  if (!module.github) {
    module.github = `https://github.com/${module.repo.replace('#', '/tree/')}`
  }
  if (!module.website) {
    module.website = module.github
  }

  // Fetch latest package.json from github
  const pkg = await fetchGithubPkg(module.repo)
  module.npm = pkg.name

  // Type
  if (module.repo.startsWith('adonisjs-community/')) {
    module.type = 'community'
  } else if (module.repo.startsWith('adonisjs/')) {
    module.type = 'official'
  } else {
    module.type = '3rd-party'
  }

  // Category
  if (!module.category) {
    if (!isNew) {
      throw new Error(`No category for ${name}`)
    } else {
      console.log(`[TODO] Add a category to ./modules/${name}.yml`)
    }
  } else if (!categories.includes(module.category)) {
    let newCat = module.category[0].toUpperCase() + module.category.substr(1)
    if (newCat.length <= 3) {
      newCat = newCat.toUpperCase()
    }
    if (categories.includes(newCat)) {
      module.category = newCat
    } else {
      throw new Error(`Unknown category ${module.category} for ${module.name}.\nSupported categories: ${categories.join(', ')}`)
    }
  }

  // TODO: Remove extra fields
  const validFields = [
    'name',
    'description',
    'npm',
    'repo',
    'icon',
    'github',
    'website',
    'learn_more',
    'category',
    'type',
    'maintainers',
    'compatibility'
  ]
  const invalidFields = []
  for (const key in module) {
    if (!validFields.includes(key)) {
      invalidFields.push(key)
      delete module[key]
    }
  }
  if (invalidFields.length) {
    console.warn(`Invalid fields for ./modules/${module.name}.yml`, invalidFields)
  }

  // Auto name
  if (!module.name) {
    module.name = (pkg.name.startsWith('@') ? pkg.name.split('/')[1] : pkg.name)
      .replace('adonis-', '')
      .replace('adonis5-', '')
      .replace('-module', '')
  }

  // Maintainers
  // TODO: Sync with maintainers.app
  if (!module.maintainers.length) {
    const owner = module.repo.split('/')[0]
    if (owner !== 'nuxt-community' && owner !== 'nuxt') {
      module.maintainers.push({
        name: owner,
        github: owner
      })
    } else if (!isNew) {
      throw new Error(`No maintainer for ${module.name}`)
    } else {
      console.log(`[TODO] Add a maintainer to ./modules/${name}.yml`)
    }
  }

  // Default description
  if (!module.description) {
    module.description = pkg.description
  }

  // Write module
  await writeModule(module)

  return module
}

export async function getModule (name: string): Promise<ModuleInfo> {
  let module: ModuleInfo = {
    name,
    description: '',
    repo: '', // adonisjs/example
    npm: '', // @adonisjs/core
    icon: '', // url or filename from /static/icons
    github: '', // github link
    website: '',
    learn_more: '',
    category: 'Devtools', // see categories.ts
    type: '3rd-party', // official, community, 3rd-party
    maintainers: []
  }

  const file = resolve(modulesDir, name + '.yml')
  if (existsSync(file)) {
    module = defu(yml.load(await fsp.readFile(file, 'utf-8')) as object, module)
  }

  return module
}

export async function writeModule (module: ModuleInfo) {
  const file = resolve(modulesDir, `${module.name}.yml`)

  await fsp.writeFile(file, yml.dump(module), 'utf8')
}

/**
 * Read all modules from the modules directory
 */
export async function readModules () {
  const globPattern = join(modulesDir, '*.yml').replace(/\\/g, '/')
  const files = await globby(globPattern)
  const names = files.map(p => basename(p, extname(p))).filter(Boolean)

  return Promise
    .all(names.map(n => getModule(n)))
    .then(modules => modules.filter(m => m.name))
}

/**
 * Sync all modules from the modules directory
 */
export async function syncAll () {
  const modules = await readModules()
  const updatedModules = await Promise.all(modules.map(module => sync(module.name, module.repo)))

  return updatedModules
}

export async function build () {
  const modules = await readModules()

  await fsp.mkdir(distDir, { recursive: true })
  await fsp.writeFile(distFile, JSON.stringify(modules, null, 2))
}
