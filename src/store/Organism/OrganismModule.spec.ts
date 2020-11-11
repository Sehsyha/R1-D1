import { OrganismBuilder } from '@/builders/OrganismBuilder'
import { OrganismCategoryBuilder } from '@/builders/OrganismCategoryBuilder'
import { OrganismEntity } from '@/db/organism/entitiy.types'
import { createOrganism, getOrganisms } from '@/db/organism/requests'
import { getOrganismCategories, getOrganismCategory } from '@/db/organismCategory/requests'
import { OrganismCategoryEntity } from '@/db/organismCategory/types'
import { Organism } from '@/models/organism'
import { OrganismCategory } from '@/models/organismCategory'
import { OrganismModule } from './OrganismModule'

jest.mock('@/db/organism/requests')
jest.mock('@/db/organismCategory/requests')

describe('OrganismModule', () => {
  let organismModule: OrganismModule
  let organismBuilder: OrganismBuilder
  let organismCategoryBuilder: OrganismCategoryBuilder

  const organismId = 'organism id'
  const organismName = 'organism name'
  const organism: Organism = {
    id: organismId,
    name: organismName
  }
  const organismEntity: OrganismEntity = {
    _id: organismId,
    name: organismName
  }

  const anotherOrganismId = 'another organism id'
  const anotherOrganismName = 'another organism name'
  const anotherOrganism: Organism = {
    id: anotherOrganismId,
    name: anotherOrganismName
  }
  const anotherOrganismEntity: OrganismEntity = {
    _id: anotherOrganismId,
    name: anotherOrganismName
  }

  const organismCategoryId = 'organism category id'
  const organismCategoryName = 'organism category name'
  const organismCategory: OrganismCategory = {
    id: organismCategoryId,
    name: organismCategoryName
  }
  const organismCategoryEntity: OrganismCategoryEntity = {
    _id: organismCategoryId,
    name: organismCategoryName
  }

  beforeEach(() => {
    organismModule = new OrganismModule(OrganismModule)

    organismBuilder = new OrganismBuilder()
    organismBuilder.fromDatabaseEntities = jest.fn()
    organismBuilder.fromDatabaseEntity = jest.fn()
    organismBuilder.withCategoryEntities = jest.fn().mockReturnValue(organismBuilder)
    OrganismBuilder.create = jest.fn().mockReturnValue(organismBuilder)

    organismCategoryBuilder = new OrganismCategoryBuilder()
    organismCategoryBuilder.fromDatabaseEntity = jest.fn()
    OrganismCategoryBuilder.create = jest.fn().mockReturnValue(organismCategoryBuilder)
  })

  describe('initial state', () => {
    it('should initialize organisms to an empty array', () => {
      expect(organismModule.organisms).toEqual([])
    })
  })

  describe('all', () => {
    it('should return categories from module', () => {
      organismModule.organisms = [organism, anotherOrganism]

      const result = organismModule.all

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(organism)
      expect(result[1]).toEqual(anotherOrganism)
    })
  })

  describe('set', () => {
    it('should the organisms in state', () => {
      const organisms = [organism]

      organismModule.set(organisms)

      expect(organismModule.organisms).toHaveLength(1)
      expect(organismModule.organisms[0]).toEqual(organism)
    })
  })

  describe('add', () => {
    it('should add the organism in the categories state', () => {
      organismModule.organisms = [organism]

      organismModule.add(anotherOrganism)

      expect(organismModule.organisms).toHaveLength(2)
      expect(organismModule.organisms[0]).toEqual(organism)
      expect(organismModule.organisms[1]).toEqual(anotherOrganism)
    })
  })

  describe('fetch', () => {
    it('should return the categories from db', async () => {
      const organismEntities = [organismEntity, anotherOrganismEntity]
      const organismCategoryEntities = [organismCategoryEntity];
      (getOrganisms as jest.Mock).mockResolvedValue(organismEntities);
      (getOrganismCategories as jest.Mock).mockResolvedValue(organismCategoryEntities);
      (organismBuilder.fromDatabaseEntities as jest.Mock).mockReturnValue([organism, anotherOrganism])

      const result = await organismModule.fetch()

      expect(organismBuilder.withCategoryEntities).toHaveBeenCalledTimes(1)
      expect(organismBuilder.withCategoryEntities).toHaveBeenCalledWith(organismCategoryEntities)

      expect(organismBuilder.fromDatabaseEntities).toHaveBeenCalledTimes(1)
      expect(organismBuilder.fromDatabaseEntities).toHaveBeenCalledWith(organismEntities)

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(organism)
      expect(result[1]).toEqual(anotherOrganism)
    })
  })

  describe('create', () => {
    const defaultPayload = {
      name: organismName,
      categoryId: organismCategoryId
    }

    it('should throw an error when an organism with the same name already exists', async () => {
      organismModule.organisms = [organism]

      try {
        await organismModule.create(defaultPayload)
        throw new Error("Organism module didn't throw any error")
      } catch (err) {
        expect(err.message).toBe(`Organism with name ${organismName} already exists`)
      }
    })

    it('should throw an error when the organism has a category that does not exist', async () => {
      (getOrganismCategory as jest.Mock).mockRejectedValue({})

      try {
        await organismModule.create(defaultPayload)
        throw new Error("Organism module didn't throw any error")
      } catch (err) {
        expect(err.message).toBe(`Category with id ${organismCategoryId} does not exist`)
      }
    })

    it('should create the organism with its category when the category is found', async () => {
      const createdOrganismEntity: OrganismEntity = {
        _id: organismId,
        name: organismName,
        categoryId: organismCategoryId
      }
      const createdOrganism: Organism = {
        id: organismId,
        name: organismName
      };
      (getOrganismCategory as jest.Mock).mockResolvedValue(organismCategoryEntity);
      (createOrganism as jest.Mock).mockResolvedValue(createdOrganismEntity);
      (organismCategoryBuilder.fromDatabaseEntity as jest.Mock).mockReturnValue(organismCategory);
      (organismBuilder.fromDatabaseEntity as jest.Mock).mockReturnValue(createdOrganism)

      const result = await organismModule.create(defaultPayload)

      expect(result.id).toEqual(organismId)
      expect(result.name).toEqual(organismName)
      expect(result.category).toEqual(organismCategory)

      expect(createOrganism).toHaveBeenCalledWith({ name: organismName, categoryId: organismCategoryId })
    })

    it('should create the organims without a category when it does not have one', async () => {
      const createdOrganismEntity: OrganismEntity = {
        _id: organismId,
        name: organismName
      }
      const createdOrganism: Organism = {
        id: organismId,
        name: organismName
      };
      (createOrganism as jest.Mock).mockResolvedValue(createdOrganismEntity);
      (organismBuilder.fromDatabaseEntity as jest.Mock).mockReturnValue(createdOrganism)

      const payload = {
        name: organismName
      }

      const result = await organismModule.create(payload)

      expect(result.id).toEqual(organismId)
      expect(result.name).toEqual(organismName)
      expect(result.category).toBeUndefined()

      expect(createOrganism).toHaveBeenCalledWith({ name: organismName, categoryId: organismCategoryId })
    })
  })
})
