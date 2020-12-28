import { OrganismRepository } from '@/organisms/app/OrganismRepository'
import { Document } from '../domain/Document'
import { DocumentCategoryRepository } from './DocumentCategoryRepository'
import { DocumentRepository } from './DocumentRepository'

export class DocumentService {
  private documentRepository: DocumentRepository
  private documentCategoryRepository: DocumentCategoryRepository
  private organismRepository: OrganismRepository

  constructor(
    documentRepository: DocumentRepository,
    documentCategoryRepository: DocumentCategoryRepository,
    organismRepository: OrganismRepository
  ) {
    this.documentRepository = documentRepository
    this.documentCategoryRepository = documentCategoryRepository
    this.organismRepository = organismRepository
  }

  public async createDocument(reference: string, categoryId: string, organismId: string) {
    const existingDocument = await this.documentRepository.findByReference(reference)
    if (existingDocument) {
      throw new Error(`Le document avec la référence "${reference}" existe déjà`)
    }

    const category = await this.documentCategoryRepository.findById(categoryId)
    const organism = await this.organismRepository.findById(organismId)

    const document = new Document(reference, category, organism)
    return this.documentRepository.create(document)
  }
}
