import { dbFactory, DBFileName } from '..'

const organismDataStore: Datastore = dbFactory(DBFileName.ORGANISM)

export function getOrganismDb(): Datastore {
  return organismDataStore
}
