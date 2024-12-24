import vine from '@vinejs/vine'

export const listTransactionsValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().optional(),
    initialDateAt: vine.date({ formats: { utc: true } }).optional(),
    finalDateAt: vine.date({ formats: { utc: true } }).optional(),
  })
)
