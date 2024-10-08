import { TransactionType } from '#constants/transation_type'
import Account from '#models/account'
import BankAccount from '#models/bank_account'
import Category from '#models/category'
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
    accountId: vine.number().exists(async (db, value) => {
      const match = await db.from(Account.table).where('id', value).first()
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

    files: vine
      .array(
        vine.file({
          size: '2mb',
          extnames: ['jpg', 'png', 'pdf'],
        })
      )
      .optional(),
  })
)
