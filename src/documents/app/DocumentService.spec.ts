import { GenerationService } from '@/common/app/GenerationService'
import { OrganismRepository } from '@/organisms/app/OrganismRepository'
import { DocumentCategoryRepository } from './DocumentCategoryRepository'
import { DocumentRepository } from './DocumentRepository'
import { DocumentService } from './DocumentService'
import { Document } from '@/documents/entities/Document'
import { DocumentCategory } from '../entities/DocumentCategory'
import { Organism } from '@/organisms/entities/Organism'

describe('DocumentService', () => {
  let documentService: DocumentService
  let documentRepository: DocumentRepository
  let documentCategoryRepository: DocumentCategoryRepository
  let organismRepository: OrganismRepository
  let generationService: GenerationService

  const REFERENCE = 'reference'
  const DOCUMENT_CATEGORY_ID = 'category id'
  const ORGANISM_ID = 'organism id'
  const DOCUMENT_ID = 'document id'
  const ORGANISM: Organism = {} as Organism
  const DOCUMENT_CATEGORY: DocumentCategory = {} as DocumentCategory
  const DOCUMENT: Document = new Document(DOCUMENT_ID, REFERENCE, DOCUMENT_CATEGORY, ORGANISM)

  beforeEach(() => {
    documentRepository = {} as DocumentRepository
    documentRepository.create = jest.fn()

    documentCategoryRepository = {} as DocumentCategoryRepository
    documentCategoryRepository.findById = jest.fn().mockResolvedValue(DOCUMENT_CATEGORY)

    organismRepository = {} as OrganismRepository
    organismRepository.findById = jest.fn().mockReturnValue(ORGANISM)

    generationService = {} as GenerationService
    generationService.id = jest.fn().mockReturnValue(DOCUMENT_ID)

    documentService = new DocumentService(
      documentRepository,
      documentCategoryRepository,
      organismRepository,
      generationService
    )
  })

  describe('createDocument', () => {
    it('should create a new document', async () => {
      documentRepository.findByReference = jest.fn().mockResolvedValue(null)

      const result = await documentService.createDocument(REFERENCE, DOCUMENT_CATEGORY_ID, ORGANISM_ID)

      expect(result).toEqual(DOCUMENT)
      expect(documentRepository.create).toHaveBeenCalledTimes(1)
      expect(documentRepository.create).toHaveBeenCalledWith(DOCUMENT)
    })

    it('should throw an error when document with same reference already exists', async () => {
      documentRepository.findByReference = jest.fn().mockResolvedValue(DOCUMENT)

      try {
        await documentService.createDocument(REFERENCE, DOCUMENT_CATEGORY_ID, ORGANISM_ID)
        throw new Error('tested method did not throw any error')
      } catch (err) {
        expect(err.message).toBe(`Le document avec la référence "${REFERENCE}" existe déjà`)
      }
    })
  })
})
