import { DEFAULT_PER_PAGE } from '#constants/default_per_page'
import User from '#models/user'
import { createUserValidator } from '#validators/users/create_user_validator'
import { listUsersValidator } from '#validators/users/list_users_validator'
import { updateUserValidator } from '#validators/users/update_user_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ request }: HttpContext) {
    const { page, perPage } = await request.validateUsing(listUsersValidator)

    const data = await User.query().paginate(page || 1, perPage || DEFAULT_PER_PAGE)

    return data
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    const user = await User.create(data)

    return user
  }

  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)

    await user.load('account')

    return user
  }

  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator, {
      meta: { userId: params.id },
    })

    const user = await User.findOrFail(params.id)

    user.merge(data)

    await user.save()

    return user
  }

  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}
