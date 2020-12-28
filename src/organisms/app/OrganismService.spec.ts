import { GenerationService } from '@/common/app/GenerationService'
import { Organism } from '../entities/Organism'
import { OrganismCategory } from '../entities/OrganismCategory'
import { OrganismCategoryRepository } from './OrganismCategoryRepository'
import { OrganismRepository } from './OrganismRepository'
import { OrganismService } from './OrganismService'

describe('OrganismService', () => {
  let organismService: OrganismService
  let organismRepository: OrganismRepository
  let organismCategoryRepository: OrganismCategoryRepository
  let generationService: GenerationService

  const ID_1 = 'id 1'
  const NAME_1 = 'name 1'
  const ID_2 = 'id 2'
  const NAME_2 = 'name 2'
  const CATEGORY_ID = 'category id'
  const CATEGORY_NAME = 'category name'
  const CATEGORY: OrganismCategory = new OrganismCategory(CATEGORY_ID, CATEGORY_NAME)

  const ORGANISM_1: Organism = new Organism(ID_1, NAME_1, CATEGORY)
  const ORGANISM_2: Organism = new Organism(ID_2, NAME_2, CATEGORY)
  const ORGANISMS: Organism[] = [ORGANISM_1, ORGANISM_2]

  beforeEach(() => {
    organismRepository = {} as OrganismRepository
    organismCategoryRepository = {} as OrganismCategoryRepository
    organismCategoryRepository.findById = jest.fn().mockResolvedValue(CATEGORY)
    generationService = {} as GenerationService

    organismService = new OrganismService(organismRepository, organismCategoryRepository, generationService)
  })

  describe('getAll', () => {
    it('should return organisms from repository', async () => {
      organismRepository.getAll = jest.fn().mockResolvedValue(ORGANISMS)

      const result = await organismService.getAll()

      expect(result).toEqual(ORGANISMS)
    })
  })

  describe('create', () => {
    it('should create a new organism', async () => {
      generationService.id = jest.fn().mockReturnValue(ID_1)
      organismRepository.findByName = jest.fn().mockResolvedValue(null)
      organismRepository.create = jest.fn()

      const result = await organismService.create(NAME_1, CATEGORY_ID)

      expect(result).toEqual(ORGANISM_1)
      expect(organismRepository.create).toHaveBeenCalledWith(ORGANISM_1)
    })

    it('should throw an error when category with same name already exists', async () => {
      organismRepository.findByName = jest.fn().mockResolvedValue(ORGANISM_1)

      try {
        await organismService.create(NAME_1, CATEGORY_ID)
        throw new Error('tested method did not throw any error')
      } catch (err) {
        expect(err.message).toBe(`L'organisme avec le nom ${NAME_1} existe déjà`)
      }
    })
  })
})
