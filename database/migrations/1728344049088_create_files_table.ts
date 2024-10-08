import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('path').notNullable()
      table.string('original_name').notNullable()
      table.bigInteger('size')
      table.string('type')
      table.string('subtype')
      table.string('extname')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
