import Account from '#models/account'
import vine from '@vinejs/vine'

export const createBankAccountValidator = vine.compile(
  vine.object({
    name: vine.string(),
    balance: vine.number(),
    accountId: vine.number().exists(async (db, value) => {
      const match = await db.from(Account.table).where('id', value).first()
      return match
    }),
  })
)
