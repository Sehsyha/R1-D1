import { getDb } from '.'
import { Organism } from '@/models/organism'

export async function createOrganisms(name: string) {
  const db = getDb()
  const organism: Organism = {
    name
  }
  return db.insert(organism)
}

export async function getOrganisms(): Promise<Organism[]> {
  const db = getDb()
  return db.find({})
}
