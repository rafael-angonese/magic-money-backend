import { DEFAULT_PER_PAGE } from '#constants/default_per_page'
import Account from '#models/account'
import { createAccountValidator } from '#validators/accounts/create_account_validator'
import { listAccountsValidator } from '#validators/accounts/list_accounts_validator'
import { updateAccountValidator } from '#validators/accounts/update_account_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AccountsController {
  async index({ request }: HttpContext) {
    const { page, perPage } = await request.validateUsing(listAccountsValidator)

    const data = await Account.query().paginate(page || 1, perPage || DEFAULT_PER_PAGE)

    return data
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createAccountValidator)

    const account = await Account.create(data)

    return account
  }

  async show({ params }: HttpContext) {
    const account = await Account.findOrFail(params.id)

    return account
  }

  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(updateAccountValidator)

    const account = await Account.findOrFail(params.id)

    account.merge(data)

    await account.save()

    return account
  }

  async destroy({ params }: HttpContext) {
    const account = await Account.findOrFail(params.id)

    await account.delete()
  }
}
