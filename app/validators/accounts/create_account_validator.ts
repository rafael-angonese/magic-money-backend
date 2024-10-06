import { AccountType } from '#constants/account_type'
import vine from '@vinejs/vine'

export const createAccountValidator = vine.compile(
  vine.object({
    name: vine.string(),
    type: vine.enum(AccountType),
  })
)
