import semver from 'semver'
import { globby } from 'globby'
import { dump, load } from 'js-yaml'
import { existsSync } from 'node:fs'
import { errors } from '@vinejs/vine'
import { basename, join } from 'node:path'
import { getDirname } from '@poppinss/utils'
import { readFile, writeFile } from 'node:fs/promises'

import type { PackageInfo, PackageManifest } from '#types/main'
import { manifestKeys, packageManifestValidator } from '#validators/package_manifest'

export const contentFolder = join(getDirname(import.meta.url), '../../content')
export const iconsFolder = join(getDirname(import.meta.url), '../../public/icons')

/**
 * Read all package files from `content/packages`, keyed by file name
 */
export async function readManifests() {
  const pattern = join(contentFolder, 'packages', '*.yml').replace(/\\/g, '/')
  const files = await globby(pattern)

  return Promise.all(
    files.sort().map(async (file) => ({
      file: basename(file),
      manifest: load(await readFile(file, 'utf-8')) as Record<string, any>,
    })),
  )
}

/**
 * Write a package file, with keys in a stable order
 */
export async function writeManifest(fileName: string, manifest: Partial<PackageManifest>) {
  const ordered: Record<string, unknown> = {}
  for (const key of manifestKeys) {
    if (manifest[key] !== undefined) ordered[key] = manifest[key]
  }

  await writeFile(join(contentFolder, 'packages', fileName), dump(ordered, { lineWidth: -1 }))
}

/**
 * Validate a package file. Returns the validated manifest along with
 * the list of problems found
 */
export async function validateManifest(manifest: Record<string, any>) {
  const problems: string[] = []

  const unknownKeys = Object.keys(manifest ?? {}).filter(
    (key) => !manifestKeys.includes(key as any),
  )
  if (unknownKeys.length) problems.push(`Unknown keys: ${unknownKeys.join(', ')}`)

  try {
    const validated = (await packageManifestValidator.validate(manifest)) as PackageManifest
    if (validated.icon && !existsSync(join(iconsFolder, validated.icon))) {
      problems.push(`Icon "${validated.icon}" does not exist in public/icons`)
    }

    return { manifest: validated, problems }
  } catch (error) {
    if (!(error instanceof errors.E_VALIDATION_ERROR)) throw error
    for (const message of error.messages) problems.push(`${message.field}: ${message.message}`)
    return { manifest: null, problems }
  }
}

/**
 * Extract `owner/repo` from a GitHub URL, ignoring any branch or folder
 */
export function githubRepoFromUrl(url: string) {
  const [owner, repo] = new URL(url).pathname.split('/').filter(Boolean)
  return `${owner}/${repo}`
}

/**
 * Convert a package file to the shape used by this website
 */
export function toPackageInfo(manifest: PackageManifest) {
  return {
    ...manifest,
    repo: githubRepoFromUrl(manifest.repo),
    github: manifest.repo,
  } as Omit<PackageInfo, 'slug' | 'stars' | 'downloads'>
}

/**
 * Compute the AdonisJS major versions a package supports from the
 * `@adonisjs/core` ranges declared by its npm releases. Majors above
 * `latestMajor` (default: the highest one in the ranges) are ignored.
 * Returns `null` when no valid range is found
 */
export function compatibilityFromCoreRanges(coreRanges: string[], latestMajor?: number) {
  const ranges = coreRanges.filter((range) => semver.validRange(range))
  if (!ranges.length) return null

  latestMajor ??= Math.max(
    ...ranges.flatMap((range) =>
      [...range.matchAll(/(?<![\d.])\d+/g)].map(([major]) => Number(major)),
    ),
  )

  const majors: number[] = []
  for (let major = 5; major <= latestMajor; major++) {
    const supported = ranges.some((range) =>
      semver.intersects(range, `^${major}.0.0`, { includePrerelease: true }),
    )
    if (supported) majors.push(major)
  }

  if (!majors.length) return null
  return majors.map((major) => `^${major}.0.0`).join(' || ')
}

/**
 * Merge compatibility strings, keeping every major version once
 */
export function mergeCompatibility(...values: string[]) {
  const majors = new Set(
    values.flatMap((value) =>
      [...value.matchAll(/\^(\d+)\.0\.0/g)].map(([, major]) => Number(major)),
    ),
  )

  return [...majors]
    .sort((a, b) => a - b)
    .map((major) => `^${major}.0.0`)
    .join(' || ')
}

/**
 * Read the `@adonisjs/core` range declared by an npm release
 */
function coreRangeOf(release: Record<string, any> | undefined) {
  return (release?.peerDependencies?.['@adonisjs/core'] ??
    release?.dependencies?.['@adonisjs/core']) as string | undefined
}

/**
 * Read the `@adonisjs/core` ranges declared by the stable, non
 * deprecated releases of an npm package document. Prereleases are
 * used only when the package has no stable release. Returns nothing
 * when the latest release does not depend on `@adonisjs/core`, since
 * older ranges no longer describe the package
 */
export function coreRangesFromNpmDocument(document: Record<string, any>) {
  const latest = document.versions?.[document['dist-tags']?.latest]
  if (!coreRangeOf(latest)) return []

  const releases = Object.entries<Record<string, any>>(document.versions ?? {}).filter(
    ([, release]) => !release.deprecated,
  )
  const stableReleases = releases.filter(([version]) => !semver.prerelease(version))

  return (stableReleases.length ? stableReleases : releases)
    .map(([, release]) => coreRangeOf(release))
    .filter((range): range is string => typeof range === 'string')
}
