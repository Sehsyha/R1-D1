export class Transaction {
  private id: string
  private amount: number
  private organismId: string
  private note?: string
  private documentId?: string

  public constructor(id: string, amount: number, organismId: string, note?: string, documentId?: string) {
    if (id === '') {
      throw new Error("L'identifiant de la transaction n'est pas renseigné")
    }

    if (amount === 0) {
      throw new Error("Le montant de la transaction n'est pas renseigné")
    }

    this.id = id
    this.amount = amount
    this.organismId = organismId
    this.note = note
    this.documentId = documentId
  }
}
