import store from '@/common/store'

import { ServiceFactory } from '@/common/factories/ServiceFactory'

import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { DocumentCategory } from '@/documents/entities/DocumentCategory'

@Module({ dynamic: true, store, name: 'documentCategory', namespaced: true })
export class DocumentCategoryModule extends VuexModule {
  private categories: DocumentCategory[] = []

  get all() {
    return this.categories
  }

  get one() {
    return (id: string) => this.categories.find(category => category.getId() === id)
  }

  @Mutation
  public set(categories: DocumentCategory[]) {
    this.categories = [...categories]
  }

  @Mutation
  public add(category: DocumentCategory) {
    this.categories = [...this.categories, category]
  }

  @Action({ commit: 'set' })
  public async fetch(): Promise<DocumentCategory[]> {
    return ServiceFactory.getDocumentCategoryService().getAll()
  }

  @Action({ commit: 'add' })
  public async create(name: string): Promise<DocumentCategory> {
    return ServiceFactory.getDocumentCategoryService().create(name)
  }
}
