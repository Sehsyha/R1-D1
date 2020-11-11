import { getDocumentCategoryDb } from '.'
import { DocumentCategoryEntity } from './types'

export async function createDocumentCategory(name: string): Promise<DocumentCategoryEntity> {
  const db = getDocumentCategoryDb()

  const category: DocumentCategoryEntity = {
    name
  }

  return db.insert(category)
}

export async function getDocumentCategories(): Promise<DocumentCategoryEntity[]> {
  const db = getDocumentCategoryDb()

  return db.find({})
}

export async function getDocumentCategory(_id: string): Promise<DocumentCategoryEntity> {
  const db = getDocumentCategoryDb()

  return db.findOne({ _id })
}
