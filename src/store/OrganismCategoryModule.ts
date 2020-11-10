import store from '.'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { OrganismCategory } from '@/models/organismCategory'
import { createOrganismCategory, getOrganismCategories } from '@/db/organismCategory/requests'

@Module({ dynamic: true, store, name: 'organismCategory', namespaced: true })
export class OrganismCategoryModule extends VuexModule {
  categories: OrganismCategory[] = []

  get all() {
    return this.categories
  }

  get find() {
    return (id: string) => this.categories.find(category => category._id === id)
  }

  @Mutation
  public set(categories: OrganismCategory[]) {
    this.categories = categories
  }

  @Mutation
  public add(category: OrganismCategory) {
    this.categories = [...this.categories, category]
  }

  @Action
  public async init() {
    return this.fetch()
  }

  @Action({ commit: 'set' })
  public async fetch(): Promise<Array<OrganismCategory>> {
    return getOrganismCategories()
  }

  @Action({ commit: 'add' })
  public async create(name: string): Promise<OrganismCategory> {
    const categoryWithSameName = this.categories.find(category => category.name === name)

    if (categoryWithSameName) {
      throw new Error(`Category with name ${name} already exists`)
    }

    const category = await createOrganismCategory(name)

    return category
  }
}
