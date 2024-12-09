import Document from '#models/document'
import Transaction from '#models/transaction'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class TransactionDocument extends BaseModel {
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
  declare documentId: number

  @belongsTo(() => Document)
  declare document: BelongsTo<typeof Document>
}
