import { readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import slugify from '@sindresorhus/slugify'
import { args, BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import type { PackageManifest } from '#types/main'
import {
  compatibilityFromCoreRanges,
  contentFolder,
  coreRangesFromNpmDocument,
  githubRepoFromUrl,
  mergeCompatibility,
  readManifests,
  validateManifest,
  writeManifest,
} from '#services/packages_content'

export default class ValidatePackages extends BaseCommand {
  static options: CommandOptions = { startApp: false }

  static commandName = 'validate:packages'
  static description = 'Validate the package files stored in content/packages'

  @args.spread({ description: 'Package files to validate. Default to all', required: false })
  declare files?: string[]

  @flags.boolean({ description: 'Also check the packages against npm and GitHub' })
  declare online: boolean

  @flags.boolean({ description: 'Update "compatibility" from npm. Implies --online' })
  declare fix: boolean

  /**
   * Fetch a JSON document. Returns `null` on 404
   */
  async #fetchJson(url: string, headers: Record<string, string> = {}) {
    const response = await fetch(url, { headers })
    if (response.status === 404) return null
    if (!response.ok) throw new Error(`${url} responded with ${response.status}`)
    return (await response.json()) as Record<string, any>
  }

  /**
   * Check a package against npm and GitHub
   */
  async #checkOnline(file: string, manifest: PackageManifest, latestCoreMajor: number) {
    const problems: string[] = []

    const token = process.env.GITHUB_TOKEN
    const repo = await this.#fetchJson(
      `https://api.github.com/repos/${githubRepoFromUrl(manifest.repo)}`,
      token ? { Authorization: `token ${token}` } : {},
    )
    if (!repo) problems.push(`GitHub repository ${manifest.repo} does not exist`)
    else if (repo.archived) problems.push(`GitHub repository ${manifest.repo} is archived`)

    if (!manifest.npm) return problems

    const document = await this.#fetchJson(
      `https://registry.npmjs.org/${manifest.npm.replace('/', '%2F')}`,
    )
    if (!document) {
      problems.push(`npm package ${manifest.npm} does not exist`)
      return problems
    }

    const latest = document.versions?.[document['dist-tags']?.latest]
    if (latest?.deprecated) problems.push(`npm package ${manifest.npm} is deprecated`)

    /**
     * Npm only adds versions: older releases may declare `@adonisjs/core`
     * as a dev dependency only, so a version missing on npm is not proof
     * that the package does not support it
     */
    const npmCompatibility = compatibilityFromCoreRanges(
      coreRangesFromNpmDocument(document),
      latestCoreMajor,
    )
    const compatibility = mergeCompatibility(manifest.compatibility, npmCompatibility ?? '')
    if (compatibility !== manifest.compatibility) {
      if (this.fix) {
        await writeManifest(file, { ...manifest, compatibility })
        this.logger.info(`${file}: compatibility updated to "${compatibility}"`)
      } else {
        problems.push(
          `compatibility should be "${compatibility}", npm releases declare "${npmCompatibility}"`,
        )
      }
    }

    return problems
  }

  /**
   * Map each file to the slug derived from its package name, to detect
   * packages that would end up on the same page
   */
  #findDuplicateSlugs(manifests: { file: string; manifest: Record<string, any> }[]) {
    const owners = new Map<string, string>()
    const duplicates = new Map<string, string>()

    for (const { file, manifest } of manifests) {
      if (typeof manifest?.name !== 'string') continue

      const slug = slugify(manifest.name)
      const owner = owners.get(slug)
      if (owner) duplicates.set(file, owner)
      else owners.set(slug, file)
    }

    return duplicates
  }

  async run() {
    const online = this.online || this.fix
    const selected = this.files?.map((file) => basename(file))
    const manifests = await readManifests()
    const files = manifests.filter(({ file }) => !selected || selected.includes(file))
    const duplicates = this.#findDuplicateSlugs(manifests)
    const problems = new Map<string, string[]>()

    const latestCore = online
      ? await this.#fetchJson('https://registry.npmjs.org/@adonisjs/core/latest')
      : null
    const latestCoreMajor = Number(latestCore?.version.split('.')[0])

    const results = await Promise.all(
      files.map(async ({ file, manifest }) => {
        const result = await validateManifest(manifest)
        if (online && result.manifest) {
          result.problems.push(...(await this.#checkOnline(file, result.manifest, latestCoreMajor)))
        }
        return { file, ...result }
      }),
    )

    for (const { file, problems: fileProblems } of results) {
      if (duplicates.has(file)) fileProblems.push(`Same name as ${duplicates.get(file)}`)
      if (fileProblems.length) problems.set(file, fileProblems)
    }

    /**
     * Files without the .yml extension are silently skipped by the build
     */
    for (const file of await readdir(join(contentFolder, 'packages'))) {
      if (!file.endsWith('.yml')) problems.set(file, ['Package files must use the .yml extension'])
    }

    for (const [file, fileProblems] of problems) {
      this.logger.error(file)
      for (const problem of fileProblems) this.logger.log(`  - ${problem}`)
    }

    if (problems.size) {
      this.exitCode = 1
      this.logger.error(`${problems.size} of ${files.length} package file(s) have problems`)
      return
    }

    this.logger.success(`${files.length} package files are valid`)
  }
}
