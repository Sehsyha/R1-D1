import { dbFactory, DBFileName } from '..'

const organismCategoryDataStore: Datastore = dbFactory(DBFileName.ORGANISM_CATEGORY)

export function getOrganismCategoryDb(): Datastore {
  return organismCategoryDataStore
}
