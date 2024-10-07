import Account from '#models/account'
import User from '#models/user'
import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from(User.table).where('email', value).first()
        return !match
      }),
    password: vine.string(),
    accountId: vine.number().exists(async (db, value) => {
      const match = await db.from(Account.table).where('id', value).first()
      return match
    }),
  })
)
