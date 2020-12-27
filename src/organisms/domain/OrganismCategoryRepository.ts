import { OrganismCategory } from '@/organisms/domain/OrganismCategory'

export interface OrganismCategoryRepository {
  create(name: string): Promise<void>;
  findById(id: string): Promise<OrganismCategory | null>;
  findByName(name: string): Promise<OrganismCategory | null>;
}
