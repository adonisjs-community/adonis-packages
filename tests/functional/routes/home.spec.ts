import { test } from '@japa/runner'
import app from '@adonisjs/core/services/app'
import { PackagesFetcher } from '#services/packages_fetcher'

import { categories } from '../../../content/categories.js'
import { FakePkgFetcher, packageFactory } from '../../helpers.js'

test.group('Home', () => {
  test('returns correct page object', async ({ assert, client }) => {
    app.container.swap(PackagesFetcher, () => {
      const packages = Array.from({ length: 7 }, () => packageFactory())
      return new PackagesFetcher(new FakePkgFetcher(), packages)
    })

    const response = await client.get('/').withInertia().header('X-Inertia-Version', '1')

    response.assertStatus(200)
    response.assertInertiaComponent('home')

    assert.deepEqual(response.inertiaProps.categories.length, categories.length)
    assert.deepEqual(response.inertiaProps.packages.length, 7)
    assert.deepEqual(response.inertiaProps.meta, {
      total: 7,
      currentPage: 1,
      pages: 1,
    })
  })

  test('filters using query parameters', async ({ assert, client }) => {
    app.container.swap(PackagesFetcher, () => {
      const packages = Array.from({ length: 50 }, () => packageFactory())
      return new PackagesFetcher(new FakePkgFetcher(), packages)
    })

    const response = await client
      .get('/')
      .qs({ category: 'Database', sort: 'downloads' })
      .withInertia()
      .header('X-Inertia-Version', '1')

    const packages = response.inertiaProps.packages as any[]
    const categoriesRes = packages.map((pkg) => pkg.category)
    const downloads = packages.map((pkg) => pkg.downloads)

    assert.deepEqual([...new Set(categoriesRes)], ['Database'])
    assert.deepEqual(
      downloads,
      downloads.sort((a, b) => b - a)
    )
  })
})
