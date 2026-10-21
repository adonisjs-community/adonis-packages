import vine from '@vinejs/vine'

import { categories } from '../../content/categories.js'

/**
 * Keys allowed in a package file, in the order they are written.
 * Anything else is rejected, so the files stay in the shape consumed
 * by adonisjs.com/packages
 */
export const manifestKeys = [
  'name',
  'description',
  'category',
  'type',
  'npm',
  'repo',
  'website',
  'icon',
  'compatibility',
  'keywords',
] as const

/**
 * GitHub repository URL, optionally pointing to a branch or a folder
 */
export const GITHUB_URL_REGEX = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(\/tree\/[\w./-]+)?$/

/**
 * One or more caret ranges on AdonisJS major versions,
 * e.g. `^6.0.0 || ^7.0.0`
 */
export const COMPATIBILITY_REGEX = /^\^\d+\.0\.0( \|\| \^\d+\.0\.0)*$/

const NPM_NAME_REGEX = /^(@[\da-z~-][\d._a-z~-]*\/)?[\da-z~-][\d._a-z~-]*$/

export const packageManifestValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1),
    description: vine.string().trim().minLength(10).maxLength(250),
    category: vine.enum(categories.map((category) => category.label)),
    type: vine.enum(['official', '3rd-party'] as const),
    repo: vine.string().regex(GITHUB_URL_REGEX),
    compatibility: vine.string().regex(COMPATIBILITY_REGEX),
    npm: vine.string().regex(NPM_NAME_REGEX).optional(),
    icon: vine.string().optional(),
    website: vine.string().url().optional(),
    keywords: vine.array(vine.string().trim().minLength(1)).optional(),
  }),
)
