import { GenerationService } from '@/common/app/GenerationService'
import { DocumentCategory } from '../entities/DocumentCategory'
import { DocumentCategoryRepository } from './DocumentCategoryRepository'

export class DocumentCategoryService {
  private generationService: GenerationService
  private documentCategoryRepository: DocumentCategoryRepository

  public constructor(
    documentCategoryRepository: DocumentCategoryRepository,
    generationService: GenerationService
  ) {
    this.documentCategoryRepository = documentCategoryRepository
    this.generationService = generationService
  }

  public async create(name: string): Promise<DocumentCategory> {
    const existingCategory = this.documentCategoryRepository.findByName(name)
    if (existingCategory) {
      throw new Error(`La catégorie ${name} existe déjà`)
    }

    const id = this.generationService.id()
    const documentCategory = new DocumentCategory(id, name)

    await this.documentCategoryRepository.create(documentCategory)

    return documentCategory
  }

  public async getAll(): Promise<DocumentCategory[]> {
    return this.documentCategoryRepository.getAll()
  }
}
