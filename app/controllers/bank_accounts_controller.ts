import { DEFAULT_PER_PAGE } from '#constants/default_per_page'
import BankAccount from '#models/bank_account'
import { createBankAccountValidator } from '#validators/bank_accounts/create_bank_account_validator'
import { listBankAccountsValidator } from '#validators/bank_accounts/list_bank_accounts_validator'
import { updateBankAccountValidator } from '#validators/bank_accounts/update_bank_account_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class BankAccountsController {
  async index({ request }: HttpContext) {
    const { page, perPage } = await request.validateUsing(listBankAccountsValidator)

    const data = await BankAccount.query().paginate(page || 1, perPage || DEFAULT_PER_PAGE)

    return data
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createBankAccountValidator)

    const bankAccount = await BankAccount.create(data)

    return bankAccount
  }

  async show({ params }: HttpContext) {
    const bankAccount = await BankAccount.findOrFail(params.id)

    await bankAccount.load('account')

    return bankAccount
  }

  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(updateBankAccountValidator)

    const bankAccount = await BankAccount.findOrFail(params.id)

    bankAccount.merge(data)

    await bankAccount.save()

    return bankAccount
  }

  async destroy({ params }: HttpContext) {
    const bankAccount = await BankAccount.findOrFail(params.id)

    await bankAccount.delete()
  }
}
