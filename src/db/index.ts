import Datastore from 'nedb-promises'

export function getDb(): Datastore {
  return Datastore.create('~/r1-d1.sql')
}
