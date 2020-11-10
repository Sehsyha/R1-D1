import { dbFactory, DBFileName } from '..'

const organismCategoryDataStore: Datastore = dbFactory(DBFileName.ORGANISM_CATEGORY)

export async function getOrganismCategoryDb(): Promise<Datastore> {
  return organismCategoryDataStore
}
