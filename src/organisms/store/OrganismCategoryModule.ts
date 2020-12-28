import store from '@/common/store'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { OrganismCategory } from '@/organisms/entities/OrganismCategory'
import { OrganismCategoryService } from '@/organisms/app/OrganismCategoryService'
import { ServiceFactory } from '@/common/factories/ServiceFactory'

@Module({ dynamic: true, store, name: 'organismCategory', namespaced: true })
export class OrganismCategoryModule extends VuexModule {
  private categories: OrganismCategory[]
  private organismCategoryService: OrganismCategoryService

  constructor() {
    super(VuexModule)

    this.categories = []
    this.organismCategoryService = ServiceFactory.getOrganismCategoryService()
  }

  get all() {
    return this.categories
  }

  get one() {
    return (id: string) => this.categories.find(category => category.getId() === id)
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
    return this.organismCategoryService.getAll()
  }

  @Action({ commit: 'add' })
  public async create(name: string): Promise<OrganismCategory> {
    return this.organismCategoryService.create(name)
  }
}
