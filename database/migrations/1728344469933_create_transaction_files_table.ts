import File from '#models/file'
import Transaction from '#models/transaction'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('transaction_id').unsigned().references('id').inTable(Transaction.table)
      table.integer('file_id').unsigned().references('id').inTable(File.table)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
