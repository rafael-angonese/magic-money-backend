import { DEFAULT_PER_PAGE } from '#constants/default_per_page'
import Transaction from '#models/transaction'
import { createTransactionValidator } from '#validators/transactions/create_transaction_validator'
import { listTransactionsValidator } from '#validators/transactions/list_transactions_validator'
import { updateTransactionValidator } from '#validators/transactions/update_transaction_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  async index({ request }: HttpContext) {
    const { page, perPage } = await request.validateUsing(listTransactionsValidator)

    const data = await Transaction.query().paginate(page || 1, perPage || DEFAULT_PER_PAGE)

    return data
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createTransactionValidator)

    const transaction = await Transaction.create(data)

    return transaction
  }

  async show({ params }: HttpContext) {
    const transaction = await Transaction.findOrFail(params.id)

    await transaction.load('category')
    await transaction.load('sourceBankAccount')
    await transaction.load('destinationBankAccount')

    return transaction
  }

  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(updateTransactionValidator)

    const transaction = await Transaction.findOrFail(params.id)

    transaction.merge(data)

    await transaction.save()

    return transaction
  }

  async destroy({ params }: HttpContext) {
    const transaction = await Transaction.findOrFail(params.id)

    await transaction.delete()
  }
}
