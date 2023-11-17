import type { categories } from '../content/categories.js'

export * from '../app/types.js'

export type PackagesFilters = {
  category?: (typeof categories)[number]['label'] | 'all'
}
