import { DocumentType } from '#constants/document_type'
import vine from '@vinejs/vine'

export const createDocumentValidator = vine.compile(
  vine.object({
    date: vine.date({ formats: { utc: true } }),
    documentType: vine.enum(DocumentType),
    file: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'pdf'],
    }),
  })
)
