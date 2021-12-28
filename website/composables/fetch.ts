import { ModuleInfo } from '~/../lib/types'
import { categories } from '~/../lib/categories'

export async function fetchModules () {
  const { modules } = await $fetch('/api/modules') as { modules: ModuleInfo[]}

  // Unique contributors
  const contributors = new Set(modules.flatMap(m => m.contributors.map(m => m.login)))

  return {
    modules,
    categories,
    stats: {
      downloads: modules.reduce((sum, m) => sum + m.downloads, 0),
      contributors: contributors.size,
      modules: modules.length
    }
  }
}

export type ModulesData = ReturnType<typeof fetchModules> extends Promise<infer R> ? R : never
