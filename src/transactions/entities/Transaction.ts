import { Document } from '@/documents/entities/Document'
import { Organism } from '@/organisms/entities/Organism'

export class Transaction {
  private id: string
  private amount: number
  private organism: Organism
  private note?: string
  private document?: Document

  public constructor(id: string, amount: number, organism: Organism | null, note?: string, document?: Document) {
    if (id === '') {
      throw new Error("L'identifiant de la transaction n'est pas renseigné")
    }

    if (amount === 0) {
      throw new Error("Le montant de la transaction n'est pas renseigné")
    }

    if (!organism) {
      throw new Error("L'organisme de la transaction n'est pas renseigné")
    }

    this.id = id
    this.amount = amount
    this.organism = organism
    this.note = note
    this.document = document
  }
}
