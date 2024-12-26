import { DEFAULT_PER_PAGE } from '#constants/default_per_page'
import File from '#models/file'
import Transaction from '#models/transaction'
import TransactionDocument from '#models/transaction_document'
import { createTransactionValidator } from '#validators/transactions/create_transaction_validator'
import { listTransactionsValidator } from '#validators/transactions/list_transactions_validator'
import { updateTransactionValidator } from '#validators/transactions/update_transaction_validator'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

export default class TransactionsController {
  async index({ auth, request }: HttpContext) {
    const { page, perPage, initialDateAt, finalDateAt } =
      await request.validateUsing(listTransactionsValidator)

    const query = Transaction.query()
      .where('accountId', auth.user!.accountId)
      .preload('documents')
      .preload('category')
      .preload('sourceBankAccount')
      .preload('destinationBankAccount')

    if (initialDateAt) {
      query.where('date', '>=', initialDateAt)
    }

    if (finalDateAt) {
      query.where('date', '<=', finalDateAt)
    }

    const data = await query
      .orderBy('date', 'desc')
      .paginate(page || 1, perPage || DEFAULT_PER_PAGE)

    return data
  }

  async store({ auth, request }: HttpContext) {
    const { documentIds, ...data } = await request.validateUsing(createTransactionValidator)

    const transaction = await Transaction.create({
      ...data,
      accountId: auth.user!.accountId,
    })

    if (documentIds) {
      await transaction.related('documents').sync(documentIds)
    }

    return transaction
  }

  async show({ params }: HttpContext) {
    const transaction = await Transaction.findOrFail(params.id)

    await transaction.load('category')
    await transaction.load('sourceBankAccount')
    await transaction.load('destinationBankAccount')
    await transaction.load('documents', (builder) => builder.preload('file'))

    return transaction
  }

  async getFile({ params, response }: HttpContext) {
    const { id, fileId } = params

    const transactionFile = await TransactionDocument.query()
      .where('transaction_id', id)
      .where('file_id', fileId)
      .firstOrFail()

    await transactionFile.load('document', (builder) => builder.preload('file'))

    const file = await File.findOrFail(transactionFile.document.file.id)

    const exists = await drive.use().exists(file.path)

    if (!exists) {
      return response.status(ResponseStatus.NotFound)
    }

    const stream = await drive.use().getStream(file.path)
    // const url = await drive.use().getSignedUrl(file.path)

    response.header('Content-Type', file.type)
    response.header('Content-Disposition', `inline; filename="${file.originalName}"`)

    return response.stream(stream)
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
