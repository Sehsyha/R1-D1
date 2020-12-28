import { DocumentCategoryRepository } from '@/documents/app/DocumentCategoryRepository'
import { OrganismCategoryRepository } from '@/organisms/app/OrganismCategoryRepository'
import { OrganismRepository } from '@/organisms/app/OrganismRepository'

export class RepositoryFactory {
  public static getDocumentCategoryRepository(): DocumentCategoryRepository {
    return {} as DocumentCategoryRepository
  }

  public static getOrganismRepository(): OrganismRepository {
    return {} as OrganismRepository
  }

  public static getOrganismCategoryRepository(): OrganismCategoryRepository {
    return {} as OrganismCategoryRepository
  }
}
