import { DEFAULT_PER_PAGE } from '#constants/default_per_page'
import Document from '#models/document'
import File from '#models/file'
import { createDocumentValidator } from '#validators/documents/create_document_validator'
import { listDocumentsValidator } from '#validators/documents/list_documents_validator'
import { updateDocumentValidator } from '#validators/documents/update_document_validator'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'

export default class DocumentsController {
  async index({ request, auth }: HttpContext) {
    const { page, perPage, initialDateAt, finalDateAt } =
      await request.validateUsing(listDocumentsValidator)

    const query = Document.query().where('accountId', auth.user!.accountId)

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
    const { file, ...data } = await request.validateUsing(createDocumentValidator)

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

    const document = await Document.create({
      ...data,
      fileId: savedFile.id,
      accountId: auth.user!.accountId,
    })

    return document
  }

  async show({ params }: HttpContext) {
    const document = await Document.findOrFail(params.id)

    return document
  }

  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(updateDocumentValidator)

    const document = await Document.findOrFail(params.id)

    document.merge(data)

    await document.save()

    return document
  }

  async destroy({ params }: HttpContext) {
    const document = await Document.findOrFail(params.id)

    await document.delete()
  }
}
