import { Organism } from '../domain/Organism'

export interface OrganismRepository {
  findById(id: string): Promise<Organism | null>;
  findByName(name: string): Promise<Organism | null>;
  create(organism: Organism): Promise<void>;
}
