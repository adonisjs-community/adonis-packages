import { categories } from '../content/categories.js'

// TODO

export interface MaintainerInfo {
  name: string
  github: string
  twitter?: string
}

export interface GithubContributor {
  login: string
  name?: string
  avatar_url?: string
}

export interface ModuleCompatibility {
  adonis: string
}

export type ModuleType = 'community' | 'official' | '3rd-party'

export interface PackageInfo {
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
   * TODO
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
  category: (typeof categories)[number]['label']

  /**
   * Type of the package. Made by the community, official, or 3rd-party
   */
  type: ModuleType

  /**
   * Maintainers of the package
   */
  maintainers: MaintainerInfo[]

  /**
   * Compatibility with AdonisJS
   */
  compatibility: ModuleCompatibility

  /**
   * Keywords for the package. Used for search
   */
  keywords?: string[]
  downloads?: number
  firstReleaseAt?: number
  lastReleaseAt?: number
}
