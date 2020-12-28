import { DocumentCategoryRepository } from '../app/DocumentCategoryRepository'
import { DocumentCategory } from '../entities/DocumentCategory'

export class DocumentCategoryInMemoryRepository implements DocumentCategoryRepository {
  private categories: DocumentCategory[] = []

  public async create(documentCategory: DocumentCategory): Promise<void> {
    this.categories.push(documentCategory)
  }

  public async getAll(): Promise<DocumentCategory[]> {
    return this.categories
  }

  public async findById(id: string): Promise<DocumentCategory | null> {
    return this.categories.find(category => category.getId() === id) ?? null
  }

  public async findByName(name: string): Promise<DocumentCategory | null> {
    return this.categories.find(category => category.getName() === name) ?? null
  }
}
