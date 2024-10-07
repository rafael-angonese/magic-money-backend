import vine from '@vinejs/vine'

export const listBankAccountsValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().optional(),
  })
)
