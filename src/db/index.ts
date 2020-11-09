import Datastore from 'nedb-promises'

enum DBFileName {
  ORGANISM = 'organism.db',
  ORGANISM_CATEGORY = 'organism-category.db',
  DOCUMENT_CATEGORY = 'document-category.db'
}

const dbFactory = (filename: string) => Datastore.create({
  filename,
  timestampData: true,
  autoload: true
})

const organismDataStore: Datastore = dbFactory(DBFileName.ORGANISM)
const organismCategoryDataStore: Datastore = dbFactory(DBFileName.ORGANISM_CATEGORY)
const documentCategoryDataStore: Datastore = dbFactory(DBFileName.DOCUMENT_CATEGORY)

export async function getOrganismDb(): Promise<Datastore> {
  return organismDataStore
}

export async function getOrganismCategoryDb(): Promise<Datastore> {
  return organismCategoryDataStore
}

export async function getDocumentCategoryDb(): Promise<Datastore> {
  return documentCategoryDataStore
}
