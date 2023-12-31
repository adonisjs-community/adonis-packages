import factory from '@adonisjs/lucid/factories'

import PackageStat from '#models/package_stats'

export const PackageStatFactory = factory
  .define(PackageStat, async ({ faker }) => ({
    packageName: faker.lorem.slug(),
    githubStars: faker.number.int(),
    weeklyDownloads: faker.number.int(),
  }))
  .build()
