import Account from '#models/account'
import User from '#models/user'
import vine from '@vinejs/vine'

export const updateUserValidator = vine.withMetaData<{ userId: number }>().compile(
  vine.object({
    name: vine.string().optional(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value, field) => {
        const match = await db
          .from(User.table)
          .whereNot('id', field.meta.userId)
          .where('email', value)
          .first()
        return !match
      })
      .optional(),
    password: vine.string().optional(),
    accountId: vine
      .number()
      .exists(async (db, value) => {
        const match = await db.from(Account.table).where('id', value).first()
        return match
      })
      .optional(),
  })
)
