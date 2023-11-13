import type { CommandOptions } from '@adonisjs/core/types/ace'

import { load } from 'js-yaml'
import { globby } from 'globby'
import { basename, join } from 'node:path'
import { getDirname } from '@poppinss/utils'
import { BaseCommand } from '@adonisjs/core/ace'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

export default class BuildPackages extends BaseCommand {
  static commandName = 'build:packages'
  static description = 'Create a big packages.json file with all the packages.'

  static options: CommandOptions = {}

  #contentFolder = join(getDirname(import.meta.url), '../content')
  #distFolder = join(getDirname(import.meta.url), '../content/build/')

  /**
   * Read a package file from the disk
   */
  async #readPackageFile(fileName: string) {
    const filePath = join(this.#contentFolder, 'packages', `${fileName}.yml`)
    return load(await readFile(filePath, 'utf-8')) as Record<string, any>
  }

  /**
   * Read all stored packages from the disk
   */
  async #readPackages() {
    const globPattern = join(this.#contentFolder, 'packages', '*.yml').replace(/\\/g, '/')
    const files = await globby(globPattern)
    const names = files.map((p) => basename(p, '.yml')).filter(Boolean)

    return await Promise.all(names.map((n) => this.#readPackageFile(n)))
  }

  /**
   * Read all packages stored as .yml and store them as a single
   * JSON file
   */
  async run() {
    const packages = await this.#readPackages()

    const distFile = join(this.#distFolder, 'packages.json')
    await mkdir(this.#distFolder, { recursive: true })
    await writeFile(distFile, JSON.stringify(packages, null, 2))

    this.logger.success(`Packages file created successfully at "${distFile}"`)
  }
}
