import { getOrganismDb } from '.'

export interface OrganismEntity {
  _id?: string;
  name: string;
  categoryId?: string;
}

export async function createOrganism(name: string, categoryId?: string): Promise<OrganismEntity> {
  const db = await getOrganismDb()

  const organism: OrganismEntity = {
    name,
    categoryId
  }

  return db.insert(organism)
}

export async function getOrganisms(): Promise<OrganismEntity[]> {
  const db = await getOrganismDb()

  return db.find({})
}
