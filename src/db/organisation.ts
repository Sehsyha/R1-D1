import { getDb } from '.'
import { Organisation } from '@/models/organisation'

export async function createOrganisation(name: string) {
  const db = getDb()
  const organisation: Organisation = {
    name
  }
  return db.insert(organisation)
}

export async function getOrganisations(): Promise<Organisation[]> {
  const db = getDb()
  return db.find({})
}
