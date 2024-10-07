import Account from '#models/account'
import vine from '@vinejs/vine'

export const updateBankAccountValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    balance: vine.number().optional(),
    accountId: vine
      .number()
      .exists(async (db, value) => {
        const match = await db.from(Account.table).where('id', value).first()
        return match
      })
      .optional(),
  })
)
