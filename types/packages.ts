import type { categories } from '../content/categories.js'

/**
 * Module compatibility with AdonisJS
 */
export type ModuleCompatibility = {
  adonis: string
}

/**
 * Module type
 */
export type ModuleType = 'community' | 'official' | '3rd-party'

/**
 * Package category type
 */
export type PackageCategory = (typeof categories)[number]['label']

export type PackageInfo = {
  /**
   * Name of the package
   * Displayed as title on the website
   */
  name: string

  /**
   * Description of the package
   * Displayed as subline on the website
   */
  description: string

  /**
   * GitHub repository, formatted as `owner/repo#branch`
   */
  repo: string

  /**
   * Npm package name
   */
  npm?: string

  /**
   * Icon of the package. Should be stored in `public/icons` since
   * it will be served by the static server
   */
  icon?: string

  /**
   * GitHub repository URL
   */
  github: string

  /**
   * Website URL. Default to github repo
   */
  website: string

  /**
   * Category of the package
   */
  category: PackageCategory

  /**
   * Type of the package. Made by the community, official, or 3rd-party
   */
  type: ModuleType

  /**
   * Compatibility with AdonisJS
   */
  compatibility?: ModuleCompatibility

  /**
   * Keywords for the package. Used for search
   */
  keywords?: string[]

  /**
   * Number of stars on GitHub
   */
  stars: number

  /**
   * Monthly downloads from npm
   */
  downloads: number

  /**
   * First release date on npm
   */
  firstReleaseAt?: string

  /**
   * Last release date on npm
   */
  lastReleaseAt?: string

  [key: string]: string | string[] | number | undefined | ModuleCompatibility
}

/**
 * Sort order. -1 is descending, 1 is ascending
 */
export type SortOrder = -1 | 1

/**
 * Packages filtering options
 */
export type PackagesFilters = {
  category: PackageCategory
  search: string
  order: SortOrder
  orderBy: 'name' | 'downloads' | 'stars' | 'updated' | 'created'
  versions: ('5' | '6')[]
  parties: ModuleType[]
  page: number
}

/**
 * Package categories with count
 */
export type PackageCategories = Array<(typeof categories)[number] & { count: number }>
