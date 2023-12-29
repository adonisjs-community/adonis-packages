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
   * Github repository, formatted as `owner/repo#branch`
   */
  repo: string

  /**
   * NPM package name
   */
  npm?: string

  /**
   * Icon of the package. Should be stored in `public/icons` since
   * it will be served by the static server
   */
  icon?: string

  /**
   * Github repository URL
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
  compatibility: ModuleCompatibility

  /**
   * Keywords for the package. Used for search
   */
  keywords?: string[]

  /**
   * Number of stars on Github
   */
  stars: number

  /**
   * Monthly downloads from NPM
   */
  downloads: number

  /**
   * First release date on NPM
   */
  firstReleaseAt?: string

  /**
   * Last release date on NPM
   */
  lastReleaseAt?: string
}

/**
 * Packages filtering options
 */
export type PackagesFilters = {
  category?: PackageCategory
  search?: string
  sort?: 'downloads' | 'stars' | 'updated' | 'created'
  page?: number
}

/**
 * Package categories with count
 */
export type PackageCategories = Array<(typeof categories)[number] & { count: number }>
