import { CategoryType } from '#constants/category_type'
import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine.string(),
    type: vine.enum(CategoryType),
  })
)
