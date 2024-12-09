import vine from '@vinejs/vine'

export const createBankAccountValidator = vine.compile(
  vine.object({
    name: vine.string(),
    balance: vine.number(),
  })
)
