import { Transaction } from '@/transactions/entities/Transaction'

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
  getAll(): Promise<Transaction[]>;
}
