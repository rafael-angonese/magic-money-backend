import vine from '@vinejs/vine'

export const updateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)
