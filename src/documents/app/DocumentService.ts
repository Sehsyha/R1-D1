import { GenerationService } from '@/common/app/GenerationService'
import { OrganismRepository } from '@/organisms/app/OrganismRepository'
import { Document } from '../entities/Document'
import { DocumentCategoryRepository } from './DocumentCategoryRepository'
import { DocumentRepository } from './DocumentRepository'

export class DocumentService {
  private documentRepository: DocumentRepository
  private documentCategoryRepository: DocumentCategoryRepository
  private organismRepository: OrganismRepository
  private generationService: GenerationService

  constructor(
    documentRepository: DocumentRepository,
    documentCategoryRepository: DocumentCategoryRepository,
    organismRepository: OrganismRepository,
    generationService: GenerationService
  ) {
    this.documentRepository = documentRepository
    this.documentCategoryRepository = documentCategoryRepository
    this.organismRepository = organismRepository
    this.generationService = generationService
  }

  public async createDocument(reference: string, categoryId: string, organismId: string): Promise<Document> {
    const existingDocument = await this.documentRepository.findByReference(reference)
    if (existingDocument) {
      throw new Error(`Le document avec la référence "${reference}" existe déjà`)
    }

    const id = this.generationService.id()
    const category = await this.documentCategoryRepository.findById(categoryId)
    const organism = await this.organismRepository.findById(organismId)

    const document = new Document(id, reference, category, organism)

    await this.documentRepository.create(document)
    return document
  }
}
