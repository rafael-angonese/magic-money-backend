import Document from '#models/document'
import Transaction from '#models/transaction'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_documents'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('transaction_id').unsigned().references('id').inTable(Transaction.table)
      table.integer('document_id').unsigned().references('id').inTable(Document.table)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
