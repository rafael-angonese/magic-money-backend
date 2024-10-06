import User from '#models/user'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('type')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.alterTable(User.table, (table) => {
      table.integer('account_id').unsigned().references('id').inTable(this.tableName)
    })
  }

  async down() {
    this.schema.alterTable(User.table, (table) => {
      table.dropColumn('account_id')
    })

    this.schema.dropTable(this.tableName)
  }
}
