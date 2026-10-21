import type { categories } from '../content/categories.js'

/**
 * Module type
 */
export type ModuleType = 'official' | '3rd-party'

/**
 * Package category type
 */
export type PackageCategory = (typeof categories)[number]['label']

/**
 * Shape of a package file stored in `content/packages/*.yml`. It mirrors
 * the fields rendered by https://adonisjs.com/packages
 */
export type PackageManifest = {
  /**
   * Name of the package, displayed as title
   */
  name: string

  /**
   * Short description, displayed as subline
   */
  description: string

  /**
   * Category of the package
   */
  category: PackageCategory

  /**
   * Type of the package
   */
  type: ModuleType

  /**
   * GitHub URL of the package. Can point to a folder of a monorepo,
   * e.g. `https://github.com/owner/repo/tree/main/packages/foo`
   */
  repo: string

  /**
   * AdonisJS major versions the package works with, written as caret
   * ranges, e.g. `^6.0.0 || ^7.0.0`
   */
  compatibility: string

  /**
   * Npm package name. Omitted for packages not published on npm
   * (starter kits, editor extensions)
   */
  npm?: string

  /**
   * Icon file name, stored in `public/icons`
   */
  icon?: string

  /**
   * Website or documentation URL, when different from the repo
   */
  website?: string

  /**
   * Keywords used for search
   */
  keywords?: string[]
}

export type PackageInfo = {
  /**
   * Name of the package
   * Displayed as title on the website
   */
  name: string

  /**
   * Slug of the package
   */
  slug: string

  /**
   * Description of the package
   * Displayed as subline on the website
   */
  description: string

  /**
   * GitHub repository, formatted as `owner/repo`
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
  website?: string

  /**
   * Category of the package
   */
  category: PackageCategory

  /**
   * Type of the package.
   */
  type: ModuleType

  /**
   * Compatibility with AdonisJS
   */
  compatibility: string

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

  [key: string]: string | string[] | number | undefined
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
  version?: '5' | '6' | '7'
  officialOnly: boolean
  page: number
}

/**
 * Package categories with count
 */
export type PackageCategories = Array<(typeof categories)[number] & { count: number }>
