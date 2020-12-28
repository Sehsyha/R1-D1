import { GenerationService } from '@/common/app/GenerationService'
import { DocumentCategory } from '../entities/DocumentCategory'
import { DocumentCategoryRepository } from './DocumentCategoryRepository'
import { DocumentCategoryService } from './DocumentCategoryService'

describe('DocumentCategoryService', () => {
  let documentCategoryService: DocumentCategoryService
  let documentCategoryRepository: DocumentCategoryRepository
  let generationService: GenerationService

  const ID_1 = 'id 1'
  const NAME_1 = 'name 1'
  const CATEGORY_1: DocumentCategory = new DocumentCategory(ID_1, NAME_1)

  const ID_2 = 'id 2'
  const NAME_2 = 'name 2'
  const CATEGORY_2: DocumentCategory = new DocumentCategory(ID_2, NAME_2)
  const CATEGORIES: DocumentCategory[] = [
    CATEGORY_1,
    CATEGORY_2
  ]

  beforeEach(() => {
    documentCategoryRepository = {} as DocumentCategoryRepository
    generationService = {} as GenerationService

    documentCategoryService = new DocumentCategoryService(documentCategoryRepository, generationService)
  })

  describe('getAll', () => {
    it('should return categories from repository', async () => {
      documentCategoryRepository.getAll = jest.fn().mockResolvedValue(CATEGORIES)

      const result = await documentCategoryService.getAll()

      expect(result).toEqual(CATEGORIES)
    })
  })

  describe('create', () => {
    it('should create a new category', async () => {
      generationService.id = jest.fn().mockReturnValue(ID_1)
      documentCategoryRepository.findByName = jest.fn().mockResolvedValue(null)
      documentCategoryRepository.create = jest.fn()

      const result = await documentCategoryService.create(NAME_1)

      expect(result).toEqual(CATEGORY_1)
      expect(documentCategoryRepository.create).toHaveBeenCalledWith(CATEGORY_1)
    })

    it('should throw an error when category with same name already exists', async () => {
      documentCategoryRepository.findByName = jest.fn().mockResolvedValue(CATEGORY_1)
      try {
        await documentCategoryService.create(NAME_1)
        throw new Error('tested method did not throw any error')
      } catch (err) {
        expect(err.message).toBe(`La catégorie ${NAME_1} existe déjà`)
      }
    })
  })
})
