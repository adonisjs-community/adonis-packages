import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { getDirname } from '@poppinss/utils'
import type { ApplicationService } from '@adonisjs/core/types'

import { PackageFetcher } from '#services/package_fetcher'
import { PackagesFetcher } from '#services/packages_fetcher'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.bind(PackagesFetcher, async () => {
      const packagesFilePath = join(getDirname(import.meta.url), '../content/build/packages.json')
      const packagesFile = JSON.parse(await readFile(packagesFilePath, 'utf-8'))

      return new PackagesFetcher(new PackageFetcher(), packagesFile)
    })
  }
}
