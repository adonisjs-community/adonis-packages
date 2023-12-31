import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

import env from '#start/env'

const databaseConfig = defineConfig({
  connection: env.get('DB_CONNECTION'),
  connections: {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: app.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: { naturalSort: true, paths: ['database/migrations'] },
    },

    test: {
      client: 'sqlite',
      connection: {
        filename: app.tmpPath('db_test.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: { naturalSort: true, paths: ['database/migrations'] },
    },
  },
})

export default databaseConfig
