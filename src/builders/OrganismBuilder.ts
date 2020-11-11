import { OrganismEntity } from '@/db/organism/entitiy.types'
import { OrganismCategoryEntity } from '@/db/organismCategory/types'
import { Organism } from '@/models/organism'
import { OrganismCategory } from '@/models/organismCategory'
import { AbstractBuilder } from './AbstractBuilder'

export class OrganismBuilder extends AbstractBuilder<OrganismEntity, Organism> {
  private categories: OrganismCategoryEntity[] = []

  public static create(): OrganismBuilder {
    return new OrganismBuilder()
  }

  public withCategoryEntities(categories: OrganismCategoryEntity[]): this {
    this.categories = categories
    return this
  }

  public fromDatabaseEntity(organismEntity: OrganismEntity): Organism {
    if (!organismEntity._id) {
      throw new Error('Organism entity id must be defined')
    }

    let organismCategory: OrganismCategory | undefined
    if (organismEntity.categoryId) {
      const organismCategoryEntity = this.categories.find(category => category._id === organismEntity.categoryId)
      if (organismCategoryEntity && organismCategoryEntity._id) {
        organismCategory = {
          id: organismCategoryEntity._id,
          name: organismCategoryEntity.name
        }
      }
    }

    return {
      id: organismEntity._id,
      name: organismEntity.name,
      category: organismCategory
    }
  }
}
