import { DEFAULT_PER_PAGE } from '#constants/default_per_page'
import Category from '#models/category'
import { createCategoryValidator } from '#validators/categories/create_category_validator'
import { listCategoriesValidator } from '#validators/categories/list_categories_validator'
import { updateCategoryValidator } from '#validators/categories/udpate_category_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ request }: HttpContext) {
    const { page, perPage } = await request.validateUsing(listCategoriesValidator)

    const data = await Category.query().paginate(page || 1, perPage || DEFAULT_PER_PAGE)

    return data
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createCategoryValidator)

    const category = await Category.create(data)

    return category
  }

  async show({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)

    return category
  }

  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(updateCategoryValidator)

    const category = await Category.findOrFail(params.id)

    category.merge(data)

    await category.save()

    return category
  }

  async destroy({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)

    await category.delete()
  }
}
