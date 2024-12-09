import vine from '@vinejs/vine'

export const updateBankAccountValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    balance: vine.number().optional(),
  })
)
