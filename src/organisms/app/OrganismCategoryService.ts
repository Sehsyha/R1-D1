import { GenerationService } from '@/common/app/GenerationService'
import { OrganismCategory } from '../domain/organismCategory'
import { OrganismCategoryRepository } from './OrganismCategoryRepository'

export class OrganismCategoryService {
  private generationService: GenerationService
  private organismCategoryRepository: OrganismCategoryRepository

  public constructor(
    organismCategoryRepository: OrganismCategoryRepository,
    generationService: GenerationService
  ) {
    this.organismCategoryRepository = organismCategoryRepository
    this.generationService = generationService
  }

  public create(name: string): Promise<void> {
    const existingCategory = this.organismCategoryRepository.findByName(name)
    if (existingCategory) {
      throw new Error(`La catégorie ${name} existe déjà`)
    }

    const id = this.generationService.id()
    const organismCategory = new OrganismCategory(id, name)

    return this.organismCategoryRepository.create(organismCategory)
  }
}
