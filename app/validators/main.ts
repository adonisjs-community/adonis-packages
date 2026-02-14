import vine from '@vinejs/vine'

import type { SortOrder } from '#types/packages'
import { categories } from '../../content/categories.js'

/**
 * Required
 * @see https://vinejs.dev/docs/html_forms_and_surprises#empty-fields-lead-to-empty-strings
 */
vine.convertEmptyStringsToNull = true

export const getHomeValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    category: vine.enum(categories.map((category) => category.label)).optional(),
    search: vine.string().optional(),
    version: vine.enum(['5', '6', '7']).optional(),
    officialOnly: vine.boolean().optional(),
    order: vine
      .enum(['-1', '1'])
      .transform((value) => Number(value) as SortOrder)
      .optional(),
    orderBy: vine.enum(['name', 'downloads', 'stars', 'updated', 'created']).optional(),
  }),
)
