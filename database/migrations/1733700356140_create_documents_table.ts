import Account from '#models/account'
import File from '#models/file'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'documents'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.datetime('date').nullable()
      table.string('document_type').notNullable()
      table.integer('account_id').unsigned().references('id').inTable(Account.table)
      table.integer('file_id').unsigned().references('id').inTable(File.table)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
