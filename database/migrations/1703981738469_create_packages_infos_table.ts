import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'package_stats'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('package_name').notNullable()
      table.integer('weekly_downloads').unsigned().notNullable()
      table.integer('github_stars').unsigned().notNullable()
      table.timestamp('first_release_at').nullable()
      table.timestamp('last_release_at').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
