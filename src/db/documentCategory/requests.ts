import { getDocumentCategoryDb } from '.'
import { DocumentCategoryEntity } from './types'

export async function createDocumentCategory(name: string): Promise<DocumentCategoryEntity> {
  const db = await getDocumentCategoryDb()

  const category: DocumentCategoryEntity = {
    name
  }

  return db.insert(category)
}

export async function getDocumentCategories(): Promise<DocumentCategoryEntity[]> {
  const db = await getDocumentCategoryDb()

  return db.find({})
}
