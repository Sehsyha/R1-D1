
import { dbFactory, DBFileName } from '..'

const documentDataStore: Datastore = dbFactory(DBFileName.DOCUMENT)

export function getDocumentDb(): Datastore {
  return documentDataStore
}
