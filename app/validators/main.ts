import vine from '@vinejs/vine'

import { categories } from '../../content/categories.js'

vine.convertEmptyStringsToNull = true

export const getHomeValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    category: vine.enum(categories.map((category) => category.label)).optional(),
    search: vine.string().optional(),
    versions: vine.array(vine.enum(['5', '6'])).optional(),
    parties: vine.array(vine.enum(['3rd-party', 'community', 'official'])).optional(),
    order: vine
      .enum(['-1', '1'])
      .transform((value) => Number(value) as -1 | 1)
      .optional(),
    orderBy: vine.enum(['name', 'downloads', 'stars', 'updated', 'created']).optional(),
  }),
)
