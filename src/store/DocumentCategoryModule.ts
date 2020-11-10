import store from '.'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { createDocumentCategory, getDocumentCategories } from '@/db/documentCategory/requests'
import { DocumentCategory } from '@/models/documentCategory'

@Module({ dynamic: true, store, name: 'documentCategory', namespaced: true })
export class DocumentCategoryModule extends VuexModule {
  categories: DocumentCategory[] = []

  get all() {
    return this.categories
  }

  get find() {
    return (id: string) => this.categories.find(category => category._id === id)
  }

  @Mutation
  public set(categories: DocumentCategory[]) {
    this.categories = categories
  }

  @Mutation
  public add(category: DocumentCategory) {
    this.categories = [...this.categories, category]
  }

  @Action
  public async init() {
    return this.fetch()
  }

  @Action({ commit: 'set' })
  public async fetch(): Promise<Array<DocumentCategory>> {
    return getDocumentCategories()
  }

  @Action({ commit: 'add' })
  public async create(name: string): Promise<DocumentCategory> {
    const categoryWithSameName = this.categories.find(category => category.name === name)

    if (categoryWithSameName) {
      throw new Error(`Category with name ${name} already exists`)
    }

    const category = await createDocumentCategory(name)

    return category
  }
}
