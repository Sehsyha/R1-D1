import { GenerationService } from '@/common/app/GenerationService'
import { OrganismRepository } from '@/organisms/app/OrganismRepository'
import { Organism } from '../../organisms/entities/Organism'
import { OrganismCategory } from '../../organisms/entities/OrganismCategory'
import { DocumentRepository } from '../../documents/app/DocumentRepository'
import { TransactionRepository } from './TransactionRepository'
import { TransactionService } from './TransactionService'
import { Document } from '@/documents/entities/Document'
import { DocumentCategory } from '@/documents/entities/DocumentCategory'

describe('TransactionService', () => {
  let transactionService: TransactionService
  let transactionRepository: TransactionRepository
  let documentRepository: DocumentRepository
  let generationService: GenerationService
  let organismRepository: OrganismRepository

  const ORGANISM_ID_1 = 'id 1'
  const NAME_1 = 'name 1'
  const ORGANISM_ID_2 = 'id 2'
  const NAME_2 = 'name 2'
  const CATEGORY_ID = 'category id'
  const CATEGORY_NAME = 'category name'
  const CATEGORY: OrganismCategory = new OrganismCategory(CATEGORY_ID, CATEGORY_NAME)

  const ORGANISM_1: Organism = new Organism(ORGANISM_ID_1, NAME_1, CATEGORY)
  const ORGANISM_2: Organism = new Organism(ORGANISM_ID_2, NAME_2, CATEGORY)
  const ORGANISMS: Organism[] = [ORGANISM_1, ORGANISM_2]

  const DOCUMENT_ID = 'document id'
  const DOCUMENT_REFERENCE = 'document reference'
  const DOCUMENT_CATEGORY_ID = 'document category id'
  const DOCUMENT_CATEGORY_NAME = 'document category name'
  const DOCUMENT_CATEGORY = new DocumentCategory(DOCUMENT_CATEGORY_ID, DOCUMENT_REFERENCE)
  const DOCUMENT: Document = new Document(DOCUMENT_ID, DOCUMENT_REFERENCE, DOCUMENT_CATEGORY, ORGANISM_1)

  const AMOUNT_1 = 10
  const NOTE_1 = 'transaction note'
  const TRANSACTION_ID_1 = 'transaction id 1'

  beforeEach(() => {
    transactionRepository = {} as TransactionRepository
    organismRepository = {} as OrganismRepository
    documentRepository = {} as DocumentRepository

    generationService = {} as GenerationService

    transactionService = new TransactionService(transactionRepository, organismRepository, documentRepository, generationService)
  })

  describe('getAll', () => {
    it('should return transactions from repository', async () => {
      transactionRepository.getAll = jest.fn().mockResolvedValue(ORGANISMS)

      const result = await transactionService.getAll()

      expect(result).toEqual(ORGANISMS)
    })
  })

  describe('create', () => {
    it('should create a transaction', async () => {
      organismRepository.findById = jest.fn().mockResolvedValue(ORGANISM_1)
      documentRepository.findById = jest.fn().mockResolvedValue(DOCUMENT)
      generationService.id = jest.fn().mockReturnValue(TRANSACTION_ID_1)

      transactionRepository.create = jest.fn()
      await transactionService.create(AMOUNT_1, ORGANISM_ID_1, NOTE_1, DOCUMENT_ID)
    })
  })
})
