import { test } from '@japa/runner'
import ace from '@adonisjs/core/services/ace'
import app from '@adonisjs/core/services/app'
import { PackageFetcher } from '#services/package_fetcher'

import AddPackage from '../../../commands/add_package.js'
import { deletePackageFile, readPackageFile } from '../../helpers.js'

/**
 * Swap the package fetcher with a fake implementation
 */
function swapPackageFetcher(options: { githubResponse?: any; npmResponse?: any } = {}) {
  const fetcher = class extends PackageFetcher {
    async fetchGithubPkg() {
      if (options.githubResponse) return options.githubResponse
      return {
        name: 'github-package-name',
        description: 'Github package description',
        author: { name: 'Github package author' },
      }
    }

    async fetchNpmPkg() {
      if (options.npmResponse) return options.npmResponse
      return {
        time: { created: '2022-01-01', modified: '2023-01-01' },
        description: 'Npm package description',
      }
    }
  }

  app.container.swap(PackageFetcher, () => new fetcher())
}

test.group('[Commands] Add Package', (group) => {
  group.each.teardown(async () => app.container.restoreAll())

  group.each.setup(() => {
    ace.ui.switchMode('raw')
    return () => ace.ui.switchMode('normal')
  })

  test('create package file with data fetched from github and npm', async ({ assert, cleanup }) => {
    swapPackageFetcher()
    cleanup(() => deletePackageFile('test-package'))

    const command = await ace.create(AddPackage, [])

    command.prompt.trap('repo').replyWith('owner/repo')
    command.prompt.trap('name').replyWith('test-package')
    command.prompt.trap('type').replyWith('Database')

    await command.exec()

    const file = await readPackageFile('test-package')
    assert.containsSubset(file, {
      name: 'test-package',
      github: 'https://github.com/owner/repo/tree/main',
      website: 'https://github.com/owner/repo/tree/main',
      description: 'Github package description',
      npm: 'github-package-name',
      compatibility: { adonis: '^5.0.0' },
      firstReleaseAt: '2022-01-01',
      lastReleaseAt: '2023-01-01',
      type: 'community',
      category: 'Database',
    })
  })

  test('create with type "official" is from official scope', async ({ assert, cleanup }) => {
    swapPackageFetcher()
    cleanup(() => deletePackageFile('test-package'))

    const command = await ace.create(AddPackage, [])

    command.prompt.trap('repo').replyWith('adonisjs/repo')
    command.prompt.trap('name').replyWith('test-package')
    command.prompt.trap('type').replyWith('Database')

    await command.exec()

    const file = await readPackageFile('test-package')
    assert.deepEqual(file.type, 'official')
  })

  test('reject if repo is not in format username/repo', async () => {
    const command = await ace.create(AddPackage, [])

    command.prompt.trap('repo').assertFails('repo', /Please enter a valid github repo name/)

    await command.exec()
  })

  test('display error if unable to fetch details from github and npm', async () => {
    swapPackageFetcher({
      githubResponse: Promise.reject(new Error('Unable to fetch details from github')),
    })

    const command = await ace.create(AddPackage, [])
    command.prompt.trap('repo').replyWith('owner/repo')

    await command.exec()

    command.assertFailed()
    command.assertLogMatches(
      /Unable to fetch details from github and npm. Double check the repo name/
    )
  })
})
