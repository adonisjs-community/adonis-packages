import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

console.log(app.tmpPath('db.sqlite3'))
const dbConfig = defineConfig({
  connection: 'sqlite',
  connections: {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: app.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
