
import { dbFactory, DBFileName } from '..'

const documentCategoryDataStore: Datastore = dbFactory(DBFileName.DOCUMENT_CATEGORY)

export async function getDocumentCategoryDb(): Promise<Datastore> {
  return documentCategoryDataStore
}
