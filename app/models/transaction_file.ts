import File from '#models/file'
import Transaction from '#models/transaction'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class TransactionFile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare transactionId: number

  @belongsTo(() => Transaction)
  declare transaction: BelongsTo<typeof Transaction>

  @column()
  declare fileId: number

  @belongsTo(() => File)
  declare file: BelongsTo<typeof File>
}
