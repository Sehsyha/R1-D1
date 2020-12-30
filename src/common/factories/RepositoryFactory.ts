import { DocumentCategoryInMemoryRepository } from '@/documents/adapters/DocumentCategoryInMemoryRepository'
import { DocumentInMemoryRepository } from '@/documents/adapters/DocumentInMemoryRepository'
import { DocumentCategoryRepository } from '@/documents/app/DocumentCategoryRepository'
import { DocumentRepository } from '@/documents/app/DocumentRepository'
import { OrganismCategoryInMemoryRepository } from '@/organisms/adapters/OrganismCategoryInMemoryRepository'
import { OrganismInMemoryRepository } from '@/organisms/adapters/OrganismInMemoryRepository'
import { OrganismCategoryRepository } from '@/organisms/app/OrganismCategoryRepository'
import { OrganismRepository } from '@/organisms/app/OrganismRepository'
import { Singleton } from '@/utils/Singleton.decorator'

export class RepositoryFactory {
  @Singleton()
  public static getDocumentRepository(): DocumentRepository {
    return new DocumentInMemoryRepository()
  }

  @Singleton()
  public static getDocumentCategoryRepository(): DocumentCategoryRepository {
    return new DocumentCategoryInMemoryRepository()
  }

  @Singleton()
  public static getOrganismRepository(): OrganismRepository {
    return new OrganismInMemoryRepository()
  }

  @Singleton()
  public static getOrganismCategoryRepository(): OrganismCategoryRepository {
    return new OrganismCategoryInMemoryRepository()
  }
}
