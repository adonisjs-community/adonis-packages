import { dump } from 'js-yaml'
import { join } from 'node:path'
import { inject } from '@adonisjs/core'
import slugify from '@sindresorhus/slugify'
import { writeFile } from 'node:fs/promises'
import { getDirname } from '@poppinss/utils'
import { BaseCommand } from '@adonisjs/core/ace'

import type { PackageInfo } from '#types/main'
import { categories } from '../content/categories.js'
import { PackageFetcher } from '#services/package_fetcher'

export default class AddPackage extends BaseCommand {
  static commandName = 'add:package'
  static description = 'Add a new package to the Adonis Packages list.'

  #package: Partial<PackageInfo> = {}

  /**
   * Display instructions to the user
   */
  #displayHeader() {
    this.ui
      .sticker()
      .heading('packages.adonisjs.com')
      .add('Add a new package to the Adonis Packages list.')
      .add('')
      .add('Just follow the prompts and review the generated file before submitting a PR 🤠')
      .render()
  }

  /**
   * Write the final package file to the disk
   */
  async #writePackageFile() {
    const file = join(
      getDirname(import.meta.url),
      `../content/packages/${slugify(this.#package.name!)}.yml`,
    )
    await writeFile(file, dump(this.#package), 'utf-8')
  }

  /**
   * Prompt user for the github repo name and branch
   */
  async #promptForGithubRepo() {
    return await this.prompt.ask('What is the github repo?', {
      name: 'repo',
      hint: 'owner/repo#main',
      result: (value) => {
        const [name, branch] = value.trim().split('#')
        return { name, branch: branch || 'main' }
      },

      validate: (value) => {
        const isValid = value.trim().length > 0 && value.includes('/')
        if (isValid) return true
        return 'Please enter a valid github repo name'
      },
    })
  }

  /**
   * Fetch package details from github and npm registry
   */
  async #fetchPackageDetails(fetcher: PackageFetcher, repo: { name: string; branch: string }) {
    const spinner = this.ui.logger.await('Fetching package details from github and npm').start()

    try {
      const githubPkg = await fetcher.fetchGithubPkg(repo.name, repo.branch)
      const npmPkg = await fetcher.fetchNpmPkg(githubPkg.name)

      return { githubPkg, npmPkg }
    } catch {
      throw new Error('Unable to fetch details from github and npm. Double check the repo name')
    } finally {
      spinner.stop()
    }
  }

  /**
   * Prompt user for the package name to be displayed on the website
   */
  async #promptForPackageName(githubPkg: Record<string, any>) {
    return await this.prompt.ask(
      'What is the package name? This name will be displayed on the website.',
      {
        name: 'name',
        hint: 'e.g. AdonisJS Prometheus',
        default: githubPkg.name,
        validate: (value) => value.trim().length > 0,
      },
    )
  }

  /**
   * Prompt user to pick a category for the package
   */
  async #promptForCategory() {
    return await this.prompt.autocomplete(
      'What type your package belongs to?',
      categories.map(({ label }) => label),
      { multiple: false, name: 'type' },
    )
  }

  /**
   * Determine the package type based upon the repo scope
   */
  #determinePackageType(repoName: string) {
    const repoScope = repoName.split('/')[0]
    const officialScopes = ['adonisjs', 'japa', 'edge-js', 'vinejs']

    if (officialScopes.includes(repoScope)) return 'official'

    return '3rd-party'
  }

  @inject()
  async run(packageFetcher: PackageFetcher) {
    this.#displayHeader()

    /**
     * Prompt user for different values and fetch package details
     */
    const repo = await this.#promptForGithubRepo()
    const { githubPkg, npmPkg } = await this.#fetchPackageDetails(packageFetcher, repo)
    const name = await this.#promptForPackageName(githubPkg)
    const category = await this.#promptForCategory()

    /**
     * Assign values to the final package file
     */
    this.#package.name = name
    this.#package.category = category
    this.#package.npm = githubPkg.name
    this.#package.repo = repo.name
    this.#package.description = githubPkg.description
    this.#package.compatibility = { adonis: '^5.0.0' }
    this.#package.firstReleaseAt = npmPkg.time.created
    this.#package.lastReleaseAt = npmPkg.time.modified
    this.#package.type = this.#determinePackageType(repo.name)
    this.#package.github = `https://github.com/${repo.name}/tree/${repo.branch}`
    this.#package.website = this.#package.github

    /**
     * Write the final package file
     */
    await this.#writePackageFile()

    this.ui
      .sticker()
      .add('🎊 Package info collected successfully and saved to:')
      .add('')
      .add(this.ui.colors.cyan(`./content/packages/${this.#package.name}.yml`))
      .add('')
      .add('Make sure to review the file and add any missing information before submitting a PR.')
      .render()
  }

  /**
   * Handle errors
   */
  async completed() {
    if (this.error) {
      this.logger.error(this.error.message)
      this.exitCode = 1
      return true
    }
  }
}
