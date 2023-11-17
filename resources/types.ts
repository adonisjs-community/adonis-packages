import type { categories } from '../content/categories.js'
export * from '../app/types.js'

export interface PackagesFilters {
  category: (typeof categories)[number]['label'] | 'all'
}
