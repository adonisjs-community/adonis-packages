import type { PackageCategories, PackageInfo } from './main.js'

export interface GetHomeResponse {
  packages: PackageInfo[]
  categories: PackageCategories
  meta: {
    total: number
    currentPage: number
    pages: number
  }
}
