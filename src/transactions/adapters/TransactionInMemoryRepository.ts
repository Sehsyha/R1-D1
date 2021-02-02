import { TransactionRepository } from '@/transactions/app/TransactionRepository'
import { Transaction } from '../entities/Transaction'

export class TransactionInMemoryRepository implements TransactionRepository {
  private transactions: Transaction[] = []

  public async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction)
  }

  public async getAll(): Promise<Transaction[]> {
    return this.transactions
  }
}
