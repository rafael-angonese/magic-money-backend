import { DocumentType } from '#constants/document_type'
import Account from '#models/account'
import File from '#models/file'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: Date

  @column()
  declare documentType: DocumentType

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare accountId: number

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>

  @column()
  declare fileId: number

  @belongsTo(() => File)
  declare file: BelongsTo<typeof File>
}
