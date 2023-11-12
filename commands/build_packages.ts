import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class BuildPackages extends BaseCommand {
  static commandName = 'build:packages'
  static description = 'Create a big packages.json file with all the packages.'

  static options: CommandOptions = {}

  async run() {}
}
