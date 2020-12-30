import store from '@/common/store'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { ServiceFactory } from '@/common/factories/ServiceFactory'

import { Document } from '../entities/Document'
import { CreateDocumentPayload } from './payloads'

@Module({ dynamic: true, store, name: 'document', namespaced: true })
export class DocumentModule extends VuexModule {
  private documents: Document[] = []

  get all() {
    return this.documents
  }

  get one() {
    return (id: string) => this.documents.find(document => document.getId() === id)
  }

  @Mutation
  public set(documents: Document[]) {
    this.documents = [...documents]
  }

  @Mutation
  public add(document: Document) {
    this.documents = [...this.documents, document]
  }

  @Action({ commit: 'set' })
  public async fetch(): Promise<Document[]> {
    return ServiceFactory.getDocumentService().getAll()
  }

  @Action({ commit: 'add' })
  public async create({ reference, categoryId, organismId }: CreateDocumentPayload): Promise<Document> {
    return ServiceFactory.getDocumentService().create(reference, categoryId, organismId)
  }
}
