import vine from '@vinejs/vine'

export const listAccountsValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().optional(),
  })
)
