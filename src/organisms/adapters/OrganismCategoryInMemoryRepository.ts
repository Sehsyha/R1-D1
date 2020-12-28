import { OrganismCategoryRepository } from '../app/OrganismCategoryRepository'
import { OrganismCategory } from '../entities/organismCategory'

export class OrganismCategoryInMemoryRepository implements OrganismCategoryRepository {
  private categories: OrganismCategory[] = []

  public async create(category: OrganismCategory): Promise<void> {
    this.categories.push(category)
  }

  public async getAll(): Promise<OrganismCategory[]> {
    return this.categories
  }

  public async findById(id: string): Promise<OrganismCategory | null> {
    return this.categories.find(category => category.getId() === id) ?? null
  }

  public async findByName(name: string): Promise<OrganismCategory | null> {
    return this.categories.find(category => category.getName() === name) ?? null
  }
}
