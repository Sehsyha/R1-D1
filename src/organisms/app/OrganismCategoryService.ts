import { GenerationService } from '@/common/app/GenerationService'
import { OrganismCategory } from '../entities/OrganismCategory'
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

  public async create(name: string): Promise<OrganismCategory> {
    const existingCategory = this.organismCategoryRepository.findByName(name)
    if (existingCategory) {
      throw new Error(`La catégorie ${name} existe déjà`)
    }

    const id = this.generationService.id()
    const organismCategory = new OrganismCategory(id, name)

    await this.organismCategoryRepository.create(organismCategory)

    return organismCategory
  }

  public async getAll(): Promise<OrganismCategory[]> {
    return this.organismCategoryRepository.getAll()
  }
}
