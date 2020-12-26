import { OrganismCategory } from '@/organisms/domain/OrganismCategory'

export interface OrganismCategoryRepository {
  create(name: string): Promise<void>;
  findAll(): Promise<OrganismCategory[]>;
  findByName(name: string): Promise<OrganismCategory | null>;
}
