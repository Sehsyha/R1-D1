import { DocumentCategoryService } from '@/documents/app/DocumentCategoryService'
import { DocumentService } from '@/documents/app/DocumentService'
import { OrganismCategoryService } from '@/organisms/app/OrganismCategoryService'
import { OrganismService } from '@/organisms/app/OrganismService'
import { Singleton } from '@/utils/Singleton.decorator'
import { GenerationServiceImpl } from '../adapters/GenerationServiceImpl'
import { GenerationService } from '../app/GenerationService'
import { RepositoryFactory } from './RepositoryFactory'

export class ServiceFactory {
  @Singleton()
  public static getDocumentService(): DocumentService {
    return new DocumentService(
      RepositoryFactory.getDocumentRepository(),
      RepositoryFactory.getDocumentCategoryRepository(),
      RepositoryFactory.getOrganismRepository(),
      ServiceFactory.getGenerationService()
    )
  }

  @Singleton()
  public static getDocumentCategoryService(): DocumentCategoryService {
    return new DocumentCategoryService(
      RepositoryFactory.getDocumentCategoryRepository(),
      ServiceFactory.getGenerationService()
    )
  }

  @Singleton()
  public static getOrganismCategoryService(): OrganismCategoryService {
    return new OrganismCategoryService(
      RepositoryFactory.getOrganismCategoryRepository(),
      ServiceFactory.getGenerationService()
    )
  }

  @Singleton()
  public static getOrganismService(): OrganismService {
    return new OrganismService(
      RepositoryFactory.getOrganismRepository(),
      RepositoryFactory.getOrganismCategoryRepository(),
      ServiceFactory.getGenerationService()
    )
  }

  @Singleton()
  public static getGenerationService(): GenerationService {
    return new GenerationServiceImpl()
  }
}
