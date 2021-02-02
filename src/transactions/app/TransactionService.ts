import { GenerationService } from '@/common/app/GenerationService'
import { DocumentRepository } from '@/documents/app/DocumentRepository'
import { OrganismRepository } from '@/organisms/app/OrganismRepository'
import { Transaction } from '../entities/Transaction'
import { TransactionRepository } from './TransactionRepository'

export class TransactionService {
  transactionRepository: TransactionRepository
  organismRepository: OrganismRepository
  documentRepository: DocumentRepository
  generationService: GenerationService

  constructor(
    transactionRepository: TransactionRepository,
    organismRepository: OrganismRepository,
    documentRepository: DocumentRepository,
    generationService: GenerationService
  ) {
    this.transactionRepository = transactionRepository
    this.organismRepository = organismRepository
    this.documentRepository = documentRepository
    this.generationService = generationService
  }

  public async create(amount: number, organismId: string, note?: string, documentId?: string): Promise<Transaction> {
    const organism = await this.organismRepository.findById(organismId)
    if (!organism) {
      throw new Error(`L'organisme ${organismId} n'a pas été trouvé`)
    }

    const document = documentId ? await this.documentRepository.findById(documentId) ?? undefined : undefined
    if (documentId && !document) {
      throw new Error(`Le document ${documentId} n'a pas été trouvé'`)
    }

    const id = this.generationService.id()
    const transaction = new Transaction(id, amount, organismId, note, documentId)

    await this.transactionRepository.create(transaction)

    return transaction
  }

  public async getAll(): Promise<Transaction[]> {
    return this.transactionRepository.getAll()
  }
}
