import { Organism } from '@/organisms/entities/Organism'
import { DocumentCategory } from './DocumentCategory'

export class Document {
  private id: string
  private reference: string
  private category: DocumentCategory
  private organism: Organism

  public constructor(
    id: string,
    reference: string,
    category: DocumentCategory | null,
    organism: Organism | null
  ) {
    if (id === '') {
      throw new Error("L'id du document n'est pas renseigné")
    }

    if (reference === '') {
      throw new Error("La référence du document n'est pas renseignée")
    }

    if (!category) {
      throw new Error("La catégorie du document n'est pas renseignée")
    }

    if (!organism) {
      throw new Error("L'organisme du document n'est pas renseigné")
    }

    this.id = id
    this.reference = reference
    this.category = category
    this.organism = organism
  }

  public getId(): string {
    return this.id
  }

  public getReference(): string {
    return this.reference
  }

  public getOrganismId(): string {
    return this.organism.getId()
  }
}
