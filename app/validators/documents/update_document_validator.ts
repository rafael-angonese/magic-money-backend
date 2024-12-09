import { DocumentType } from '#constants/document_type'
import vine from '@vinejs/vine'

export const updateDocumentValidator = vine.compile(
  vine.object({
    date: vine.date({ formats: { utc: true } }).optional(),
    documentType: vine.enum(DocumentType).optional(),
  })
)
