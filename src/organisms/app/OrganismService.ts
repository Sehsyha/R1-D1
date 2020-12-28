import { GenerationService } from '@/common/app/GenerationService'
import { Organism } from '../domain/Organism'
import { OrganismCategoryRepository } from './OrganismCategoryRepository'
import { OrganismRepository } from './OrganismRepository'

export class OrganismService {
  private organismRepository: OrganismRepository
  private organismCategoryRepository: OrganismCategoryRepository
  private generationService: GenerationService

  constructor(
    organismRepository: OrganismRepository,
    organismCategoryRepository: OrganismCategoryRepository,
    generationService: GenerationService
  ) {
    this.organismRepository = organismRepository
    this.organismCategoryRepository = organismCategoryRepository
    this.generationService = generationService
  }

  public async createOrganism(name: string, categoryId: string): Promise<void> {
    const existingOrganism = this.organismRepository.findByName(name)
    if (existingOrganism) {
      throw new Error(`L'organisme avec le nom ${name} existe déjà`)
    }

    const id = this.generationService.id()
    const category = await this.organismCategoryRepository.findById(categoryId)
    const organism = new Organism(id, name, category)

    return this.organismRepository.create(organism)
  }
}
