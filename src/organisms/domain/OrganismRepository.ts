import { Organism } from '@/organisms/domain/Organism'

export interface OrganismRepository {
  findByName(name: string): Promise<Organism | null>;
  create(name: string, categoryId: string): Promise<void>;
}
