import { TransactionType } from '#constants/transation_type'
import BankAccount from '#models/bank_account'
import Category from '#models/category'
import Document from '#models/document'
import vine from '@vinejs/vine'

export const createTransactionValidator = vine.compile(
  vine.object({
    date: vine.date({ formats: { utc: true } }),
    type: vine.enum(TransactionType),
    amount: vine.number(),
    description: vine.string(),
    categoryId: vine.number().exists(async (db, value) => {
      const match = await db.from(Category.table).where('id', value).first()
      return match
    }),
    sourceBankAccountId: vine.number().exists(async (db, value) => {
      const match = await db.from(BankAccount.table).where('id', value).first()
      return match
    }),
    destinationBankAccountId: vine
      .number()
      .exists(async (db, value) => {
        const match = await db.from(BankAccount.table).where('id', value).first()
        return match
      })
      .optional()
      .requiredWhen('type', '=', TransactionType.TRANSFER),
    documentIds: vine
      .array(
        vine.number().exists(async (db, value) => {
          const match = await db.from(Document.table).where('id', value).first()
          return match
        })
      )
      .optional(),
  })
)
