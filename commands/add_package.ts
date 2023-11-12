import { BaseCommand } from '@adonisjs/core/ace'
import { categories } from '../content/categories.js'
import { PackageInfo } from '../app/types.js'
import { join } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { dump } from 'js-yaml'
import { getDirname } from '@poppinss/utils'

export default class AddPackage extends BaseCommand {
  static commandName = 'add:package'
  static description = 'Add a new package to the Adonis Packages list.'

  #pkgInfo: Partial<PackageInfo> = {}

  async #fetchNpmPkg(name: string) {
    return fetch(`http://registry.npmjs.org/${name}`).then((res) => res.json()) as Promise<
      Record<string, any>
    >
  }

  async #fetchGithubPkg(repository: string, branch = 'main') {
    const url = `https://raw.githubusercontent.com/${repository}/${branch}/package.json`
    return fetch(url).then((res) => res.json()) as Promise<Record<string, any>>
  }

  #displayHeader() {
    this.ui
      .sticker()
      .add('Add a new package to the Adonis Packages list.')
      .heading('packages.adonisjs.com')
      .render()
  }

  async #writeModuleFile() {
    const file = join(getDirname(import.meta.url), `../content/packages/${this.#pkgInfo.name}.yml`)

    await writeFile(file, dump(this.#pkgInfo), 'utf-8')
  }

  async run() {
    this.#displayHeader()

    const repo = await this.prompt.ask('What is the github repo?', {
      hint: 'e.g. my-github-username/my-repo-name#main',
      name: 'repo',
      default: 'julien-r44/adonisjs-prometheus',
      format: (value) => value.trim(),
      result: (value) => {
        const [name, branch = 'main'] = value.split('#')
        return { name, branch }
      },

      validate: (value) => value.trim().length > 0 && value.includes('/'),
    })

    const spinner = this.ui.logger.await('Fetching package details from github and npm')

    spinner.start()
    let githubPkg = await this.#fetchGithubPkg(repo.name, repo.branch)
    let npmPkg = await this.#fetchNpmPkg(githubPkg.name)

    spinner.stop()

    const name = await this.prompt.ask(
      'What is the package name ? This name will be displayed on the website.',
      {
        name: 'name',
        hint: 'e.g. AdonisJS Prometheus',
        default: githubPkg.name,
        validate: (value) => value.trim().length > 0,
      }
    )

    console.log(npmPkg)
    console.log(githubPkg)
    this.#pkgInfo.name = name
    this.#pkgInfo.github = `https://github.com/${repo.name}/tree/${repo.branch}`
    this.#pkgInfo.website = this.#pkgInfo.github
    this.#pkgInfo.description = githubPkg.description
    this.#pkgInfo.npm = githubPkg.name
    this.#pkgInfo.compatibility = { adonis: '^5.0.0' }
    this.#pkgInfo.maintainers = [{ name: githubPkg.author.name, github: githubPkg.author.name }]
    this.#pkgInfo.firstReleaseAt = npmPkg.time.created
    this.#pkgInfo.lastReleaseAt = npmPkg.time.modified

    // type
    const officialScopes = ['adonisjs', 'japa', 'edge-js', 'vinejs']
    const repoScope = repo.name.split('/')[0]
    if (repoScope === 'adonisjs-community') {
      this.#pkgInfo.type = 'community'
    } else if (officialScopes.includes(repoScope)) {
      this.#pkgInfo.type = 'official'
    } else {
      this.#pkgInfo.type = 'community'
    }

    const category = await this.prompt.autocomplete(
      'What type your package belongs to?',
      categories.map(({ label }) => label),
      { multiple: false, name: 'type' }
    )

    this.#pkgInfo.category = category

    await this.#writeModuleFile()

    this.ui
      .sticker()
      .add('🎊 Package info collected successfully and saved to :')
      .add('')
      .add(this.ui.colors.cyan(`./content/packages/${this.#pkgInfo.name}.yml`))
      .add('')
      .add('Make sure to review the file and add any missing information before submitting a PR.')
      .render()
  }
}
