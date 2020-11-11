import store from '.'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { createDocumentCategory, getDocumentCategories } from '@/db/documentCategory/requests'
import { DocumentCategory } from '@/models/documentCategory'
import { DocumentCategoryBuilder } from '@/builders/DocumentCategoryBuilder'

@Module({ dynamic: true, store, name: 'documentCategory', namespaced: true })
export class DocumentCategoryModule extends VuexModule {
  categories: DocumentCategory[] = []

  get all() {
    return this.categories
  }

  get find() {
    return (id: string) => this.categories.find(category => category.id === id)
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
    const categoryEntities = await getDocumentCategories()
    const documentCategoryBuilder = DocumentCategoryBuilder.create()
    return documentCategoryBuilder.fromDatabaseEntities(categoryEntities)
  }

  @Action({ commit: 'add' })
  public async create(name: string): Promise<DocumentCategory> {
    const categoryWithSameName = this.categories.find(category => category.name === name)

    if (categoryWithSameName) {
      throw new Error(`Category with name ${name} already exists`)
    }

    const documentCategoryBuilder = DocumentCategoryBuilder.create()
    const categoryEntity = await createDocumentCategory(name)

    return documentCategoryBuilder.fromDatabaseEntity(categoryEntity)
  }
}
