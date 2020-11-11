import { CreateOrganismPayload } from '@/store/Organism/payloads'
import { getOrganismDb } from '.'
import { OrganismEntity } from './entitiy.types'

export async function createOrganism(payload: CreateOrganismPayload): Promise<OrganismEntity> {
  const db = getOrganismDb()

  const organism: OrganismEntity = {
    name: payload.name,
    categoryId: payload.categoryId
  }

  return db.insert(organism)
}

export async function getOrganisms(): Promise<OrganismEntity[]> {
  const db = getOrganismDb()

  return db.find({})
}

export async function getOrganism(_id: string): Promise<OrganismEntity> {
  const db = getOrganismDb()

  return db.findOne({ _id })
}
