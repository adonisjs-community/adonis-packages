import vine from '@vinejs/vine'

import { categories } from '../../content/categories.js'

export const getHomeValidator = vine.compile(
  vine.object({
    sort: vine.enum(['downloads', 'stars', 'updated', 'created']).optional(),
    search: vine.string().optional(),
    category: vine.enum(categories.map((category) => category.label)).optional(),
    page: vine.number().optional(),
  }),
)
