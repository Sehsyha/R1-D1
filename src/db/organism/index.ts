import { dbFactory, DBFileName } from '..'

const organismDataStore: Datastore = dbFactory(DBFileName.ORGANISM)

export async function getOrganismDb(): Promise<Datastore> {
  return organismDataStore
}
