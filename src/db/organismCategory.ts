import { OrganismCategory } from '@/models/organismCategory'
import { getOrganismCategoryDb } from '.'

export async function createOrganismCategory(name: string) {
  const db = await getOrganismCategoryDb()

  const category: OrganismCategory = {
    name
  }

  return db.insert(category)
}

export async function getOrganismCategories(): Promise<OrganismCategory[]> {
  const db = await getOrganismCategoryDb()

  return db.find({})
}
