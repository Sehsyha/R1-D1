import { DocumentCategoryService } from '@/documents/app/DocumentCategoryService'
import { OrganismCategoryService } from '@/organisms/app/OrganismCategoryService'
import { OrganismService } from '@/organisms/app/OrganismService'
import { GenerationService } from '../app/GenerationService'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  public static getDocumentCategoryService(): DocumentCategoryService {
    return new DocumentCategoryService(
      RepositoryFactory.getDocumentCategoryRepository(),
      ServiceFactory.getGenerationService()
    )
  }

  public static getOrganismCategoryService(): OrganismCategoryService {
    return new OrganismCategoryService(
      RepositoryFactory.getOrganismCategoryRepository(),
      ServiceFactory.getGenerationService()
    )
  }

  public static getOrganismService(): OrganismService {
    return new OrganismService(
      RepositoryFactory.getOrganismRepository(),
      RepositoryFactory.getOrganismCategoryRepository(),
      ServiceFactory.getGenerationService()
    )
  }

  public static getGenerationService(): GenerationService {
    return {} as GenerationService
  }
}
