import { OrganismRepository } from '../app/OrganismRepository'
import { Organism } from '../entities/Organism'

export class OrganismInMemoryRepository implements OrganismRepository {
  private organisms: Organism[] = []

  public async findById(id: string): Promise<Organism | null> {
    return this.organisms.find(organism => organism.getId() === id) ?? null
  }

  public async findByName(name: string): Promise<Organism | null> {
    return this.organisms.find(organism => organism.getName() === name) ?? null
  }

  public async create(organism: Organism): Promise<void> {
    this.organisms.push(organism)
  }

  public async getAll(): Promise<Organism[]> {
    return this.organisms
  }
}
