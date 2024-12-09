import { TransactionType } from '#constants/transation_type'
import Account from '#models/account'
import BankAccount from '#models/bank_account'
import Category from '#models/category'
import Document from '#models/document'
import TransactionDocument from '#models/transaction_document'
import User from '#models/user'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: Date

  @column()
  declare type: TransactionType

  @column()
  declare amount: number

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare categoryId: number

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @column()
  declare accountId: number

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>

  @column()
  declare sourceBankAccountId: number

  @belongsTo(() => BankAccount, {
    foreignKey: 'sourceBankAccountId',
  })
  declare sourceBankAccount: BelongsTo<typeof BankAccount>

  @column()
  declare destinationBankAccountId: number

  @belongsTo(() => BankAccount, {
    foreignKey: 'destinationBankAccountId',
  })
  declare destinationBankAccount: BelongsTo<typeof BankAccount>

  @manyToMany(() => Document, {
    pivotTable: TransactionDocument.table,
  })
  declare documents: ManyToMany<typeof Document>
}
