import { ModuleInfo } from '~/../lib/types'
import { categories } from '~/../lib/categories'

/**
 * Take compatibility module key and return it as a list of tags
 */
function assignCompatTags (modules: ModuleInfo[]) {
  return modules.map((module) => {
    const compat = module.compatibility.adonis || '^5.0.0'

    const tags = []
    if (compat === '^5.0.0 || ^6.0.0') {
      tags.push('5.x', '6.x')
    } else if (compat === '^5.0.0') {
      tags.push('5.x')
    } else if (compat === '^6.0.0') {
      tags.push('6.x')
    }

    module.tags = [
      ...module.tags || [],
      ...tags
    ]

    return module
  })
}

export async function fetchModules () {
  let { modules } = await $fetch('/api/modules') as { modules: ModuleInfo[]}

  // Assign compatibility tags
  modules = assignCompatTags(modules)

  // Unique contributors
  const contributors = new Set(modules.flatMap(m => m.contributors!.map(m => m.login)))

  return {
    modules,
    categories,
    stats: {
      downloads: modules.reduce((sum, m) => sum + m.downloads!, 0),
      contributors: contributors.size,
      modules: modules.length
    }
  }
}

export type ModulesData = ReturnType<typeof fetchModules> extends Promise<infer R> ? R : never
