import Category from '#models/category'
import vine from '@vinejs/vine'

export const updateTransactionValidator = vine.compile(
  vine.object({
    date: vine.date({ formats: { utc: true } }).optional(),
    amount: vine.number().optional(),
    description: vine.string().optional(),
    categoryId: vine
      .number()
      .exists(async (db, value) => {
        const match = await db.from(Category.table).where('id', value).first()
        return match
      })
      .optional(),
  })
)
