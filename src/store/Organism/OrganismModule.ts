import store from '..'
import { createOrganism, getOrganisms } from '@/db/organism'
import { Organism } from '@/models/organism'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { OrganismCategoryModule } from '../OrganismCategoryModule'
import { OrganismCategory } from '@/models/organismCategory'
import { CreateOrganismPayload } from './payloads'

@Module({ dynamic: true, store, name: 'organisation' })
export class OrganismModule extends VuexModule {
  private categoryModule = getModule(OrganismCategoryModule)
  organisms: Organism[] = []

  get allOrganisms() {
    return this.organisms
  }

  @Mutation
  public setOrganisms(organisms: Organism[]) {
    this.organisms = organisms
  }

  @Mutation
  public addOrganism(organism: Organism) {
    this.organisms = [...this.organisms, organism]
  }

  @Action
  public async init() {
    return this.fetchOrganisms()
  }

  @Action({ commit: 'setOrganisms' })
  public async fetchOrganisms(): Promise<Array<Organism>> {
    const organismEntities = await getOrganisms()

    return organismEntities.map(organismEntity => {
      let category: OrganismCategory | undefined
      if (organismEntity.categoryId) {
        category = this.categoryModule.findCategory(organismEntity.categoryId)
      }

      return {
        _id: organismEntity._id,
        name: organismEntity.name,
        category
      }
    })
  }

  @Action({ commit: 'addOrganism' })
  public async createOrganism({ name, categoryId }: CreateOrganismPayload): Promise<Organism> {
    const organismWithSameName = this.organisms.find(organism => organism.name === name)
    if (organismWithSameName) {
      throw new Error(`Organism with name ${name} already exists`)
    }

    let category: OrganismCategory | undefined

    if (categoryId) {
      category = this.categoryModule.findCategory(categoryId)

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
