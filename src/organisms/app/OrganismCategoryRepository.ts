import { OrganismCategory } from '@/organisms/domain/OrganismCategory'

export interface OrganismCategoryRepository {
  create(category: OrganismCategory): Promise<void>;
  findById(id: string): Promise<OrganismCategory | null>;
  findByName(name: string): Promise<OrganismCategory | null>;
}
