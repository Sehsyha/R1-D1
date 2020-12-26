import { Organism } from '@/models/organism'

export class Transaction {
  private amount: number
  private type: TransactionType
  private organism: Organism

  constructor(amount: number, type: TransactionType, organims: Organism) {
    this.amount = amount
    this.type=  type
    this.organism = organism
  }
}
