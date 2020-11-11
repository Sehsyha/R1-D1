import { DocumentCategoryEntity } from '@/db/documentCategory/types'
import { DocumentCategory } from '@/models/documentCategory'
import { AbstractBuilder } from './AbstractBuilder'

export class DocumentCategoryBuilder extends AbstractBuilder<DocumentCategoryEntity, DocumentCategory> {
  public static create(): DocumentCategoryBuilder {
    return new DocumentCategoryBuilder()
  }

  public fromDatabaseEntity(documentCategoryEntity: DocumentCategoryEntity): DocumentCategory {
    if (!documentCategoryEntity._id) {
      throw new Error('Document category entity id must be defined')
    }

    return {
      id: documentCategoryEntity._id,
      name: documentCategoryEntity.name
    }
  }
}
