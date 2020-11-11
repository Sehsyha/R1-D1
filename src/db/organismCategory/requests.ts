import { getOrganismCategoryDb } from '.'
import { OrganismCategoryEntity } from './types'

export async function createOrganismCategory(name: string): Promise<OrganismCategoryEntity> {
  const db = await getOrganismCategoryDb()

  const category: OrganismCategoryEntity = {
    name
  }

  return db.insert(category)
}

export async function getOrganismCategories(): Promise<OrganismCategoryEntity[]> {
  const db = await getOrganismCategoryDb()

  return db.find({})
}
