import { OrganismCategoryEntity } from '@/db/organismCategory/types'
import { OrganismCategory } from '@/models/organismCategory'
import { AbstractBuilder } from './AbstractBuilder'

export class OrganismCategoryBuilder extends AbstractBuilder<OrganismCategoryEntity, OrganismCategory> {
  public static create(): OrganismCategoryBuilder {
    return new OrganismCategoryBuilder()
  }

  public fromDatabaseEntity(organismCategoryEntity: OrganismCategoryEntity): OrganismCategory {
    if (!organismCategoryEntity._id) {
      throw new Error('Organism category entity id must be defined')
    }

    return {
      id: organismCategoryEntity._id,
      name: organismCategoryEntity.name
    }
  }
}
