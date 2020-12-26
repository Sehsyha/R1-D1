import { OrganismCategoryRepository } from './OrganismCategoryRepository'

export class OrganismCategoryService {
  private organismCategoryRepository: OrganismCategoryRepository

  public constructor(organismCategoryRepository: OrganismCategoryRepository) {
    this.organismCategoryRepository = organismCategoryRepository
  }

  public create(name: string): Promise<void> {
    const existingCategory = this.organismCategoryRepository.findByName(name)
    if (existingCategory) {
      throw new Error(`La catégorie ${name} existe déjà`)
    }

    return this.organismCategoryRepository.create(name)
  }
}
