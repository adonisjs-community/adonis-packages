import { ui } from './cliui.js'
import { sync, syncAll, build } from './modules.js'
import { version } from './version.js'

async function main () {
  const [command, ...args] = process.argv.splice(2)

  switch (command) {
    case 'sync':
      {
        const [name, repo] = args
        if (name) {
          ui.logger.info('Syncing ' + (name === '-' ? repo : name))
          const module = await sync(name, repo, true)
          ui.logger.info('Synced ' + module.name)
          return
        }

        ui.logger.info('Syncing all modules')
        const modules = await syncAll()
        ui.logger.info('Synced ' + modules.length + ' modules')
      }
      break
    case 'build':
      await build()
      break
    case 'version':
      await version()
      break
    default:
      console.error('Unknown command: ' + command)
      process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
