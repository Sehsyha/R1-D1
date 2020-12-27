import { Organism } from './Organism'
import { OrganismCategoryRepository } from './OrganismCategoryRepository'
import { OrganismRepository } from './OrganismRepository'

export class OrganismService {
  private organismRepository: OrganismRepository
  private organismCategoryRepository: OrganismCategoryRepository

  constructor(
    organismRepository: OrganismRepository,
    organismCategoryRepository: OrganismCategoryRepository
  ) {
    this.organismRepository = organismRepository
    this.organismCategoryRepository = organismCategoryRepository
  }

  public async createOrganism(name: string, categoryId: string): Promise<void> {
    const existingOrganism = this.organismRepository.findByName(name)
    if (existingOrganism) {
      throw new Error(`L'organisme avec le nom ${name} existe déjà`)
    }

    const category = await this.organismCategoryRepository.findById(categoryId)
    const organism = new Organism(name, category)

    return this.organismRepository.create(organism)
  }
}
