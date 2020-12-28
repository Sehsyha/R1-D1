import { GenerationService } from '@/common/app/GenerationService'
import { OrganismCategory } from '../entities/OrganismCategory'
import { OrganismCategoryRepository } from './OrganismCategoryRepository'
import { OrganismCategoryService } from './OrganismCategoryService'

describe('OrganismCategoryService', () => {
  let organismCategoryService: OrganismCategoryService
  let organismCategoryRepository: OrganismCategoryRepository
  let generationService: GenerationService

  const ID_1 = 'id 1'
  const NAME_1 = 'name 1'
  const CATEGORY_1: OrganismCategory = new OrganismCategory(ID_1, NAME_1)

  const ID_2 = 'id 2'
  const NAME_2 = 'name 2'
  const CATEGORY_2: OrganismCategory = new OrganismCategory(ID_2, NAME_2)
  const CATEGORIES: OrganismCategory[] = [
    CATEGORY_1,
    CATEGORY_2
  ]

  beforeEach(() => {
    organismCategoryRepository = {} as OrganismCategoryRepository
    generationService = {} as GenerationService

    organismCategoryService = new OrganismCategoryService(organismCategoryRepository, generationService)
  })

  describe('getAll', () => {
    it('should return categories from repository', async () => {
      organismCategoryRepository.getAll = jest.fn().mockResolvedValue(CATEGORIES)

      const result = await organismCategoryService.getAll()

      expect(result).toEqual(CATEGORIES)
    })
  })

  describe('create', () => {
    it('should create a new category', async () => {
      generationService.id = jest.fn().mockReturnValue(ID_1)
      organismCategoryRepository.findByName = jest.fn().mockResolvedValue(null)
      organismCategoryRepository.create = jest.fn()

      const result = await organismCategoryService.create(NAME_1)

      expect(result).toEqual(CATEGORY_1)
      expect(organismCategoryRepository.create).toHaveBeenCalledWith(CATEGORY_1)
    })

    it('should throw an error when category with same name already exists', async () => {
      organismCategoryRepository.findByName = jest.fn().mockResolvedValue(CATEGORY_1)
      try {
        await organismCategoryService.create(NAME_1)
        throw new Error('tested method did not throw any error')
      } catch (err) {
        expect(err.message).toBe(`La catégorie ${NAME_1} existe déjà`)
      }
    })
  })
})
