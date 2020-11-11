
import { dbFactory, DBFileName } from '..'

const documentCategoryDataStore: Datastore = dbFactory(DBFileName.DOCUMENT_CATEGORY)

export function getDocumentCategoryDb(): Datastore {
  return documentCategoryDataStore
}
