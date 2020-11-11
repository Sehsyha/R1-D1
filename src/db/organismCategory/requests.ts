import { getOrganismCategoryDb } from '.'
import { OrganismCategoryEntity } from './types'

export async function createOrganismCategory(name: string): Promise<OrganismCategoryEntity> {
  const db = getOrganismCategoryDb()

  const category: OrganismCategoryEntity = {
    name
  }

  return db.insert(category)
}

export async function getOrganismCategories(): Promise<OrganismCategoryEntity[]> {
  const db = getOrganismCategoryDb()

  return db.find({})
}

export async function getOrganismCategory(_id: string): Promise<OrganismCategoryEntity> {
  const db = getOrganismCategoryDb()

  return db.findOne({ _id })
}
