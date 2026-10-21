import { test } from '@japa/runner'

import {
  compatibilityFromCoreRanges,
  coreRangesFromNpmDocument,
  githubRepoFromUrl,
  mergeCompatibility,
  toPackageInfo,
  validateManifest,
} from '#services/packages_content'

const validManifest = {
  name: 'my-package',
  description: 'A package doing useful things',
  category: 'Database',
  type: '3rd-party',
  npm: '@me/my-package',
  repo: 'https://github.com/me/my-package',
  compatibility: '^6.0.0 || ^7.0.0',
}

test.group('Packages content | validateManifest', () => {
  test('accept a valid package file', async ({ assert }) => {
    const result = await validateManifest(validManifest)

    assert.deepEqual(result.problems, [])
    assert.deepEqual(result.manifest, validManifest)
  })

  test('reject unknown keys', async ({ assert }) => {
    const result = await validateManifest({ ...validManifest, github: 'https://github.com/me' })
    assert.deepEqual(result.problems, ['Unknown keys: github'])
  })

  test('reject an invalid {0}')
    .with([
      { field: 'category', value: 'Unknown' },
      { field: 'type', value: 'community' },
      { field: 'repo', value: 'me/my-package' },
      { field: 'repo', value: 'https://gitlab.com/me/my-package' },
      { field: 'compatibility', value: '>=6.0.0' },
      { field: 'compatibility', value: '^6.2.0' },
      { field: 'npm', value: 'My Package' },
    ])
    .run(async ({ assert }, { field, value }) => {
      const result = await validateManifest({ ...validManifest, [field]: value })

      assert.isNull(result.manifest)
      assert.lengthOf(result.problems, 1)
      assert.match(result.problems[0], new RegExp(`^${field}:`))
    })

  test('accept a repo pointing to a monorepo folder', async ({ assert }) => {
    const repo = 'https://github.com/me/monorepo/tree/main/packages/my-package'
    const result = await validateManifest({ ...validManifest, repo })

    assert.deepEqual(result.problems, [])
  })

  test('reject a missing icon file', async ({ assert }) => {
    const result = await validateManifest({ ...validManifest, icon: 'missing.png' })
    assert.deepEqual(result.problems, ['Icon "missing.png" does not exist in public/icons'])
  })
})

test.group('Packages content | compatibility', () => {
  test('compute "{1}" from {0}')
    .with([
      [['^6.2.0'], '^6.0.0'],
      [['^6.2.0 || ^7.0.0'], '^6.0.0 || ^7.0.0'],
      [['^7.0.0-next.16 || ^7.0.0'], '^7.0.0'],
      [['>=5.0.0'], '^5.0.0 || ^6.0.0 || ^7.0.0'],
      [['^6.1.5-32'], '^6.0.0'],
      [['^5.0.0', '^6.2.0', 'not a range'], '^5.0.0 || ^6.0.0'],
    ] as const)
    .run(({ assert }, [ranges, expected]) => {
      assert.equal(compatibilityFromCoreRanges([...ranges], 7), expected)
    })

  test('cap majors to the highest one in the ranges by default', ({ assert }) => {
    assert.equal(compatibilityFromCoreRanges(['^6.19.0']), '^6.0.0')
  })

  test('return null when no valid range is given', ({ assert }) => {
    assert.isNull(compatibilityFromCoreRanges([], 7))
    assert.isNull(compatibilityFromCoreRanges(['not a range'], 7))
  })

  test('read the core ranges from stable, non deprecated npm releases', ({ assert }) => {
    const document = {
      'dist-tags': { latest: '3.0.0' },
      'versions': {
        '1.0.0': { peerDependencies: { '@adonisjs/core': '^5.0.0' } },
        '1.1.0': { peerDependencies: { '@adonisjs/core': '^5.9.0' }, deprecated: 'broken' },
        '2.0.0': { peerDependencies: { lodash: '^4.0.0' } },
        '3.0.0-next.1': { peerDependencies: { '@adonisjs/core': '^8.0.0-next.1' } },
        '3.0.0': { dependencies: { '@adonisjs/core': '^7.0.0' } },
      },
    }

    assert.deepEqual(coreRangesFromNpmDocument(document), ['^5.0.0', '^7.0.0'])
  })

  test('fall back to prereleases when there is no stable release', ({ assert }) => {
    const document = {
      'dist-tags': { latest: '1.0.0-next.1' },
      'versions': { '1.0.0-next.1': { peerDependencies: { '@adonisjs/core': '^7.0.0' } } },
    }

    assert.deepEqual(coreRangesFromNpmDocument(document), ['^7.0.0'])
  })

  test('ignore old ranges when the latest release does not depend on core', ({ assert }) => {
    const document = {
      'dist-tags': { latest: '2.0.0' },
      'versions': {
        '1.0.0': { peerDependencies: { '@adonisjs/core': '^5.0.0' } },
        '2.0.0': { peerDependencies: { tailwindcss: '^4.0.0' } },
      },
    }

    assert.deepEqual(coreRangesFromNpmDocument(document), [])
  })

  test('merge compatibility strings', ({ assert }) => {
    assert.equal(
      mergeCompatibility('^5.0.0 || ^6.0.0', '^6.0.0 || ^7.0.0'),
      '^5.0.0 || ^6.0.0 || ^7.0.0',
    )
    assert.equal(mergeCompatibility('^6.0.0', ''), '^6.0.0')
  })
})

test.group('Packages content | toPackageInfo', () => {
  test('derive owner/repo and github url from the repo url', ({ assert }) => {
    const repo = 'https://github.com/me/monorepo/tree/main/packages/my-package'
    const info = toPackageInfo({ ...validManifest, repo } as any)

    assert.equal(githubRepoFromUrl(repo), 'me/monorepo')
    assert.equal(info.repo, 'me/monorepo')
    assert.equal(info.github, repo)
  })
})
