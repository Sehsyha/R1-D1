import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import store from '@/common/store'
import { Transaction } from '@/transactions/entities/Transaction'
import { ServiceFactory } from '@/common/factories/ServiceFactory'
import { CreateTransactionPayload } from './payloads'

@Module({ dynamic: true, store, name: 'transaction', namespaced: true })
export class TransactionModule extends VuexModule {
  private transactions: Transaction[] = []

  get all(): Transaction[] {
    return this.transactions
  }

  @Mutation
  public set(transactions: Transaction[]) {
    this.transactions = [...transactions]
  }

  @Mutation
  public add(transaction: Transaction) {
    this.transactions = [...this.transactions, transaction]
  }

  @Action({ commit: 'set' })
  public async fetch(): Promise<Transaction[]> {
    return ServiceFactory.getTransactionService().getAll()
  }

  @Action({ commit: 'add' })
  public async create({ amount, note, organismId, documentId }: CreateTransactionPayload): Promise<Transaction> {
    return ServiceFactory.getTransactionService().create(amount, organismId, note, documentId)
  }
}
