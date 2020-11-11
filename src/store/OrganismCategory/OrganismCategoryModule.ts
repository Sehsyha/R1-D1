import store from '..'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { OrganismCategory } from '@/models/organismCategory'
import { createOrganismCategory, getOrganismCategories } from '@/db/organismCategory/requests'
import { OrganismCategoryBuilder } from '@/builders/OrganismCategoryBuilder'

@Module({ dynamic: true, store, name: 'organismCategory', namespaced: true })
export class OrganismCategoryModule extends VuexModule {
  categories: OrganismCategory[] = []

  get all() {
    return this.categories
  }

  get one() {
    return (id: string) => this.categories.find(category => category.id === id)
  }

  @Mutation
  public set(categories: OrganismCategory[]) {
    this.categories = categories
  }

  @Mutation
  public add(category: OrganismCategory) {
    this.categories = [...this.categories, category]
  }

  @Action({ commit: 'set' })
  public async fetch(): Promise<Array<OrganismCategory>> {
    const organismCategoryEntities = await getOrganismCategories()
    const organismCategoryBuilder = new OrganismCategoryBuilder()

    return organismCategoryBuilder.fromDatabaseEntities(organismCategoryEntities)
  }

  @Action({ commit: 'add' })
  public async create(name: string): Promise<OrganismCategory> {
    const categoryWithSameName = this.categories.find(category => category.name === name)

    if (categoryWithSameName) {
      throw new Error(`Category with name ${name} already exists`)
    }

    const organismCategoryBuilder = OrganismCategoryBuilder.create()
    const categoryEntity = await createOrganismCategory(name)

    return organismCategoryBuilder.fromDatabaseEntity(categoryEntity)
  }
}
