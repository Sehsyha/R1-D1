import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { Document } from '@/models/document'
import store from '..'
import { getDocumentCategory } from '@/db/documentCategory/requests'
import { getOrganism } from '@/db/organism/requests'
import { CreateDocumentPayload } from './payloads'

@Module({ dynamic: true, store, name: 'document', namespaced: true })
export class DocumentModule extends VuexModule {
  public documents: Document[] = []

  @Mutation
  public add(document: Document) {
    this.documents = [...this.documents, document]
  }

  // @Action({ commit: 'add' })
  // public async create(payload: CreateDocumentPayload): Promise<Document> {
  //   const category = await getDocumentCategory(payload.categoryId)
  //   const organism = await getOrganism(payload.organismId)
  // }
}
