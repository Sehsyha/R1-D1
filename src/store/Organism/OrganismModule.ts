import store from '..'
import { createOrganism, getOrganisms } from '@/db/organism/requests'
import { Organism } from '@/models/organism'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { OrganismCategory } from '@/models/organismCategory'
import { CreateOrganismPayload } from './payloads'
import { getOrganismCategories } from '@/db/organismCategory/requests'

@Module({ dynamic: true, store, name: 'organism', namespaced: true })
export class OrganismModule extends VuexModule {
  organisms: Organism[] = []

  get allOrganisms() {
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

  @Action
  public async init() {
    return this.fetch()
  }

  @Action({ commit: 'set' })
  public async fetch(): Promise<Array<Organism>> {
    const organismEntities = await getOrganisms()
    const categories = await getOrganismCategories()

    return organismEntities.map(organismEntity => {
      let category: OrganismCategory | undefined
      if (organismEntity.categoryId) {
        category = categories.find(categoryInDb => categoryInDb._id === organismEntity.categoryId)
      }

      return {
        _id: organismEntity._id,
        name: organismEntity.name,
        category
      }
    })
  }

  @Action({ commit: 'add' })
  public async create({ name, categoryId }: CreateOrganismPayload): Promise<Organism> {
    const organismWithSameName = this.organisms.find(organism => organism.name === name)
    if (organismWithSameName) {
      throw new Error(`Organism with name ${name} already exists`)
    }

    let category: OrganismCategory | undefined

    if (categoryId) {
      const categories = await getOrganismCategories()

      category = categories.find(categoryInDb => categoryInDb._id === categoryId)

      if (!category) {
        throw new Error(`Category with id ${categoryId} does not exist`)
      }
    }

    const organismEntity = await createOrganism(name, categoryId)

    return {
      ...organismEntity,
      category
    }
  }
}
