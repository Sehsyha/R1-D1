import store from '..'
import { createOrganism, getOrganisms } from '@/db/organism/requests'
import { Organism } from '@/models/organism'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { OrganismCategory } from '@/models/organismCategory'
import { CreateOrganismPayload } from './payloads'
import { getOrganismCategories, getOrganismCategory } from '@/db/organismCategory/requests'
import { OrganismBuilder } from '@/builders/OrganismBuilder'
import { OrganismCategoryBuilder } from '@/builders/OrganismCategoryBuilder'
import { OrganismCategoryEntity } from '@/db/organismCategory/types'

@Module({ dynamic: true, store, name: 'organism', namespaced: true })
export class OrganismModule extends VuexModule {
  organisms: Organism[] = []

  get all() {
    return this.organisms
  }

  @Mutation
  public set(organisms: Organism[]) {
    this.organisms = organisms
  }

  @Mutation
  public add(organism: Organism) {
    this.organisms = [...this.organisms, organism]
  }

  @Action({ commit: 'set' })
  public async fetch(): Promise<Array<Organism>> {
    const organismEntities = await getOrganisms()
    const categories = await getOrganismCategories()

    const organismBuilder = OrganismBuilder.create().withCategoryEntities(categories)

    return organismBuilder.fromDatabaseEntities(organismEntities)
  }

  @Action({ commit: 'add' })
  public async create({ name, categoryId }: CreateOrganismPayload): Promise<Organism> {
    const organismWithSameName = this.organisms.find(organism => organism.name === name)
    if (organismWithSameName) {
      throw new Error(`Organism with name ${name} already exists`)
    }

    let category: OrganismCategory | undefined

    if (categoryId) {
      let categoryEntity: OrganismCategoryEntity | undefined
      try {
        categoryEntity = await getOrganismCategory(categoryId)
      } catch (err) {
        throw new Error(`Category with id ${categoryId} does not exist`)
      }

      const organismCategoryBuilder = OrganismCategoryBuilder.create()

      category = organismCategoryBuilder.fromDatabaseEntity(categoryEntity)
    }

    const organismEntity = await createOrganism({ name, categoryId })
    const organismBuilder = OrganismBuilder.create()
    const organism = organismBuilder.fromDatabaseEntity(organismEntity)

    return {
      ...organism,
      category
    }
  }
}
