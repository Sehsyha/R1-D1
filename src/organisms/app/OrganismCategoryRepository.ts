import { OrganismCategory } from '@/organisms/entities/OrganismCategory'

export interface OrganismCategoryRepository {
  create(category: OrganismCategory): Promise<void>;
  getAll(): Promise<OrganismCategory[]>;
  findById(id: string): Promise<OrganismCategory | null>;
  findByName(name: string): Promise<OrganismCategory | null>;
}
