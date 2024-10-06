import vine from '@vinejs/vine'

export const updateAccountValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)
