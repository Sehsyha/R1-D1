import { OrganismCategory } from '@/models/organismCategory'
import { getOrganismCategoryDb } from '.'
import { OrganismCategoryEntity } from './types'

export async function createOrganismCategory(name: string): Promise<OrganismCategoryEntity> {
  const db = await getOrganismCategoryDb()

  const category: OrganismCategory = {
    name
  }

  return db.insert(category)
}

export async function getOrganismCategories(): Promise<OrganismCategoryEntity[]> {
  const db = await getOrganismCategoryDb()

  return db.find({})
}
