import Account from '#models/account'
import BankAccount from '#models/bank_account'
import Category from '#models/category'
import User from '#models/user'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('type').notNullable()
      table.datetime('date').notNullable()
      table.double('amount').notNullable()
      table.string('description')

      table.integer('user_id').unsigned().references('id').inTable(User.table)
      table.integer('category_id').unsigned().references('id').inTable(Category.table)
      table.integer('account_id').unsigned().references('id').inTable(Account.table)
      table.integer('source_bank_account_id').unsigned().references('id').inTable(BankAccount.table)
      table
        .integer('destination_bank_account_id')
        .unsigned()
        .references('id')
        .inTable(BankAccount.table)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
