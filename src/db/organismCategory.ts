import { OrganismCategory } from '@/models/organismCategory'
import { getOrganismCategoryDb } from '.'

export interface OrganismCategoryEntity {
  _id?: string;
  name: string;
}

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
