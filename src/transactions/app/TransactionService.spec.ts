import { GenerationService } from '@/common/app/GenerationService'
import { OrganismRepository } from '@/organisms/app/OrganismRepository'
import { DocumentRepository } from '../../documents/app/DocumentRepository'
import { TransactionRepository } from './TransactionRepository'
import { TransactionService } from './TransactionService'
import { Transaction } from '../entities/Transaction'

describe('TransactionService', () => {
  let transactionService: TransactionService
  let generationService: GenerationService

  let transactionRepository: TransactionRepository
  let documentRepository: DocumentRepository
  let organismRepository: OrganismRepository

  const ORGANISM_ID = 'organism id'

  const DOCUMENT_ID = 'document id'
  const AMOUNT = 10
  const NOTE = 'transaction note'
  const TRANSACTION_ID = 'transaction id 1'

  beforeEach(() => {
    transactionRepository = {} as TransactionRepository
    organismRepository = {} as OrganismRepository
    documentRepository = {} as DocumentRepository

    generationService = {} as GenerationService

    transactionService = new TransactionService(transactionRepository, organismRepository, documentRepository, generationService)
  })

  describe('create', () => {
    it('should create a transaction', async () => {
      organismRepository.findById = jest.fn().mockResolvedValue({})
      documentRepository.findById = jest.fn().mockResolvedValue({})
      generationService.id = jest.fn().mockReturnValue(TRANSACTION_ID)

      transactionRepository.create = jest.fn()
      const result = await transactionService.create(AMOUNT, ORGANISM_ID, NOTE, DOCUMENT_ID)
      const expectedTransaction = new Transaction(TRANSACTION_ID, AMOUNT, ORGANISM_ID, NOTE, DOCUMENT_ID)

      expect(result).toEqual(expectedTransaction)
    })
  })
})
