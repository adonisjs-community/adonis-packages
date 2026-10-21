import { join } from 'node:path'
import { BaseCommand } from '@adonisjs/core/ace'
import { mkdir, writeFile } from 'node:fs/promises'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import {
  contentFolder,
  readManifests,
  toPackageInfo,
  validateManifest,
} from '#services/packages_content'

export default class BuildPackages extends BaseCommand {
  static options: CommandOptions = { startApp: false }

  static commandName = 'build:packages'
  static description = 'Create a big packages.json file with all the packages.'

  #distFolder = join(contentFolder, 'build')

  /**
   * Validate all the package files and store them as a single
   * JSON file
   */
  async run() {
    const packages = []
    let invalidFiles = 0

    for (const { file, manifest } of await readManifests()) {
      const result = await validateManifest(manifest)
      if (!result.manifest || result.problems.length) {
        invalidFiles++
        this.logger.error(`${file}: ${result.problems.join('; ')}`)
        continue
      }

      packages.push(toPackageInfo(result.manifest))
    }

    if (invalidFiles) {
      this.logger.error(`${invalidFiles} invalid package file(s). Run "node ace validate:packages"`)
      this.exitCode = 1
      return
    }

    const distFile = join(this.#distFolder, 'packages.json')
    await mkdir(this.#distFolder, { recursive: true })
    await writeFile(distFile, JSON.stringify(packages, null, 2))

    this.logger.success(`Packages file created successfully at "${distFile}"`)
  }
}
