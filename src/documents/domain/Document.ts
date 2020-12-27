import { Organism } from '@/organisms/domain/Organism'
import { DocumentCategory } from './DocumentCategory'

export class Document {
  private reference: string
  private category: DocumentCategory
  private organism: Organism

  public constructor(
    reference: string,
    category: DocumentCategory | null,
    organism: Organism | null
  ) {
    if (reference === '') {
      throw new Error("La référence du document n'est pas renseignée")
    }

    if (!category) {
      throw new Error("La catégorie du document n'est pas renseignée")
    }

    if (!organism) {
      throw new Error("L'organisme du document n'est pas renseigné")
    }

    this.reference = reference
    this.category = category
    this.organism = organism
  }
}
