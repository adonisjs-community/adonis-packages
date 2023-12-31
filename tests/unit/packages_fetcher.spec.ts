import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import cache from '@adonisjs/cache/services/main'

import { PackagesFetcher } from '#services/packages_fetcher'
import { FakePkgFetcher, packageFactory } from '../helpers.js'

test.group('Packages Fetcher', (group) => {
  group.each.setup(async () => {
    await db.beginGlobalTransaction()
    return () => db.rollbackGlobalTransaction()
  })

  group.teardown(() => cache.clear())

  test('returns categories with count', async ({ assert }) => {
    const result = await new PackagesFetcher(new FakePkgFetcher(), [
      await packageFactory({ category: 'Database' }),
      await packageFactory({ category: 'Database' }),
      await packageFactory({ category: 'Database' }),
      await packageFactory({ category: 'Authentication' }),
      await packageFactory({ category: 'Authentication' }),
    ]).fetchPackages()

    const authCategory = result.categories.find((category) => category.label === 'Authentication')
    const dbCategory = result.categories.find((category) => category.label === 'Database')

    assert.equal(authCategory?.count, 2)
    assert.equal(dbCategory?.count, 3)
  })

  test('add github stars to each packages', async ({ assert }) => {
    const result = await new PackagesFetcher(new FakePkgFetcher(), [
      await packageFactory(),
      await packageFactory(),
      await packageFactory(),
    ]).fetchPackages()

    const stars = result.packages.map((pkg) => pkg.stars)
    const downloads = result.packages.map((pkg) => pkg.downloads)

    assert.isTrue(stars.every((star) => star >= 200))
    assert.isTrue(downloads.every((download) => download >= 20_000))
  })

  test('filter packages by category', async ({ assert }) => {
    const result = await new PackagesFetcher(new FakePkgFetcher(), [
      await packageFactory({ category: 'Database' }),
      await packageFactory({ category: 'Database' }),
      await packageFactory({ category: 'Database' }),
      await packageFactory({ category: 'Authentication' }),
      await packageFactory({ category: 'Authentication' }),
    ]).fetchPackages({ category: 'Database' })

    assert.equal(result.packages.length, 3)
  })

  test('sort packages by stars', async ({ assert }) => {
    const result = await new PackagesFetcher(new FakePkgFetcher(), [
      await packageFactory(),
      await packageFactory(),
      await packageFactory(),
      await packageFactory(),
      await packageFactory(),
    ]).fetchPackages({ sort: 'stars' })

    const stars = result.packages.map((pkg) => pkg.stars)

    assert.deepEqual(
      stars,
      stars.sort((a, b) => b - a),
    )
  })

  test('return pagination meta', async ({ assert }) => {
    const fetcher = new PackagesFetcher(
      new FakePkgFetcher(),
      await Promise.all(Array.from({ length: 50 }).map(() => packageFactory())),
    )

    const result = await fetcher.fetchPackages({ page: 2 })

    assert.deepEqual(result.meta, { currentPage: 2, total: 50, pages: 6 })
  })

  test('search package by name', async ({ assert }) => {
    const fetcher = new PackagesFetcher(new FakePkgFetcher(), [
      await packageFactory({ name: 'adonis-foo' }),
      await packageFactory({ name: 'adonis-bar' }),
      await packageFactory({ name: 'adonis-baz' }),
      await packageFactory({ name: 'adonis-xyz' }),
    ])

    const result = await fetcher.fetchPackages({ search: 'adonis-b' })

    assert.equal(result.packages.length, 2)
  })
})
