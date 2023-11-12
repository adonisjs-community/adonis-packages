import { test } from '@japa/runner'
import ace from '@adonisjs/core/services/ace'
import AddPackage from '../../../commands/add_package.js'
import { readPackageFile } from '../../helpers.js'

test.group('Add Package', (group) => {
  group.each.setup(() => {
    ace.ui.switchMode('raw')
    return () => ace.ui.switchMode('normal')
  })

  test('create the package file correctly', async ({ assert }) => {
    const command = await ace.create(AddPackage, [])

    command.prompt.trap('repo').replyWith('julien-r44/adonisjs-prometheus')
    command.prompt.trap('name').replyWith('test-package')
    command.prompt.trap('type').replyWith('Database')

    await command.exec()

    const file = await readPackageFile('test-package')
    assert.containsSubset(file, {
      name: 'test-package',
      github: 'https://github.com/julien-r44/adonisjs-prometheus/tree/main',
      website: 'https://github.com/julien-r44/adonisjs-prometheus/tree/main',
      description: 'Prometheus wrapper for Adonis 5',
      npm: 'adonis5-prometheus',
      compatibility: { adonis: '^5.0.0' },
      maintainers: [{}],
      firstReleaseAt: '2021-12-18T22:49:27.072Z',
      type: 'community',
      category: 'Database',
    })
  })
})
