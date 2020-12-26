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

    const possibleCategories = await this.organismCategoryRepository.findAll()
    const existingCategory = possibleCategories.find(category => category.getId() === categoryId)
    if (!existingCategory) {
      throw new Error(`La catégorie ${categoryId} n'existe pas`)
    }

    return this.organismRepository.create(name, categoryId)
  }
}
