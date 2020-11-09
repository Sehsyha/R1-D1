import { DocumentCategory } from '@/models/documentCategory'
import { getDocumentCategoryDb } from '.'

export interface DocumentCategoryEntity {
  _id?: string;
  name: string;
}

export async function createDocumentCategory(name: string): Promise<DocumentCategoryEntity> {
  const db = await getDocumentCategoryDb()

  const category: DocumentCategory = {
    name
  }

  return db.insert(category)
}

export async function getDocumentCategories(): Promise<DocumentCategoryEntity[]> {
  const db = await getDocumentCategoryDb()

  return db.find({})
}
