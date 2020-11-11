import Datastore from 'nedb-promises'

export enum DBFileName {
  ORGANISM = 'organism.db',
  ORGANISM_CATEGORY = 'organism-category.db',
  DOCUMENT = 'document.db',
  DOCUMENT_CATEGORY = 'document-category.db'
}

export const dbFactory = (filename: string) => Datastore.create({
  filename,
  timestampData: true,
  autoload: true
})
