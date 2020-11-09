import store from '.'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { OrganismCategory } from '@/models/organismCategory'
import { createOrganismCategory, getOrganismCategories } from '@/db/organismCategory'

@Module({ dynamic: true, store, name: 'category' })
export class OrganismCategoryModule extends VuexModule {
  categories: OrganismCategory[] = []

  get allCategories() {
    return this.categories
  }

  get findCategory() {
    return (id: string) => this.categories.find(category => category._id === id)
  }

  @Mutation
  public setCategories(categories: OrganismCategory[]) {
    this.categories = categories
  }

  @Mutation
  public addCategory(category: OrganismCategory) {
    this.categories = [...this.categories, category]
  }

  @Action
  public async init() {
    return this.fetchCategories()
  }

  @Action({ commit: 'setCategories' })
  public async fetchCategories(): Promise<Array<OrganismCategory>> {
    return getOrganismCategories()
  }

  @Action({ commit: 'addCategory' })
  public async createCategory(name: string): Promise<OrganismCategory> {
    const categoryWithSameName = this.categories.find(category => category.name === name)

    if (categoryWithSameName) {
      throw new Error(`Category with name ${name} already exists`)
    }

    const category = await createOrganismCategory(name)

    return category
  }
}
