import { DEFAULT_PER_PAGE } from '#constants/default_per_page'
import File from '#models/file'
import Transaction from '#models/transaction'
import TransactionFile from '#models/transaction_file'
import { createTransactionValidator } from '#validators/transactions/create_transaction_validator'
import { listTransactionsValidator } from '#validators/transactions/list_transactions_validator'
import { updateTransactionValidator } from '#validators/transactions/update_transaction_validator'
import { cuid } from '@adonisjs/core/helpers'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

export default class TransactionsController {
  async index({ request }: HttpContext) {
    const { page, perPage } = await request.validateUsing(listTransactionsValidator)

    const data = await Transaction.query().paginate(page || 1, perPage || DEFAULT_PER_PAGE)

    return data
  }

  async store({ request }: HttpContext) {
    const { files, ...data } = await request.validateUsing(createTransactionValidator)

    const transaction = await Transaction.create(data)

    if (files && files.length > 0) {
      for (const file of files) {
        const key = `uploads/${cuid()}.${file.extname}`
        await file.moveToDisk(key)

        const savedFile = await File.create({
          path: key,
          originalName: file.clientName,
          size: file.size,
          type: file.type,
          subtype: file.subtype,
          extname: file.extname,
        })

        await TransactionFile.create({
          transactionId: transaction.id,
          fileId: savedFile.id,
        })
      }
    }

    return transaction
  }

  async show({ params }: HttpContext) {
    const transaction = await Transaction.findOrFail(params.id)

    await transaction.load('category')
    await transaction.load('sourceBankAccount')
    await transaction.load('destinationBankAccount')
    await transaction.load('files')

    return transaction
  }

  async getFile({ params, response }: HttpContext) {
    const { id, fileId } = params

    const transactionFile = await TransactionFile.query()
      .where('transaction_id', id)
      .where('file_id', fileId)
      .firstOrFail()

    const file = await File.findOrFail(transactionFile.fileId)

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
