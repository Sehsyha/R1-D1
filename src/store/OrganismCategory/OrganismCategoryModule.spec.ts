import { OrganismCategoryBuilder } from '@/builders/OrganismCategoryBuilder'
import { createOrganismCategory, getOrganismCategories } from '@/db/organismCategory/requests'
import { OrganismCategoryEntity } from '@/db/organismCategory/types'
import { OrganismCategory } from '@/models/organismCategory'
import { OrganismCategoryModule } from './OrganismCategoryModule'

jest.mock('@/db/organismCategory/requests')

describe('OrganismCategoryModule', () => {
  let organismCategoryModule: OrganismCategoryModule
  let builder: OrganismCategoryBuilder
  const categoryId = 'category id'
  const categoryName = 'category name'
  const category: OrganismCategory = {
    id: categoryId,
    name: categoryName
  }

  const categoryEntity: OrganismCategoryEntity = {
    _id: categoryId,
    name: categoryName
  }

  const anotherCategoryId = 'another category id'
  const anotherCategoryName = 'another category name'
  const anotherCategory: OrganismCategory = {
    id: anotherCategoryId,
    name: anotherCategoryName
  }
  const anotherCategoryEntity: OrganismCategoryEntity = {
    _id: anotherCategoryId,
    name: anotherCategoryName
  }

  beforeEach(() => {
    organismCategoryModule = new OrganismCategoryModule(OrganismCategoryModule)

    builder = new OrganismCategoryBuilder()
    builder.fromDatabaseEntities = jest.fn()
    builder.fromDatabaseEntity = jest.fn()
    OrganismCategoryBuilder.create = jest.fn().mockReturnValue(builder)
  })

  describe('initial state', () => {
    it('should initialize categories to an empty array', () => {
      expect(organismCategoryModule.categories).toEqual([])
    })
  })

  describe('all', () => {
    it('should return categories from module', () => {
      organismCategoryModule.categories = [category, anotherCategory]

      const result = organismCategoryModule.all

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(category)
      expect(result[1]).toEqual(anotherCategory)
    })
  })

  describe('one', () => {
    it('should return the category when it is found', () => {
      organismCategoryModule.categories = [anotherCategory, category]

      const result = organismCategoryModule.one(categoryId)

      expect(result).toEqual(category)
    })

    it('should return undefined when the category is not found', () => {
      organismCategoryModule.categories = [anotherCategory]

      const result = organismCategoryModule.one(categoryId)

      expect(result).toBeUndefined()
    })
  })

  describe('set', () => {
    it('should the categories in state', () => {
      const categories = [category]

      organismCategoryModule.set(categories)

      expect(organismCategoryModule.categories).toHaveLength(1)
      expect(organismCategoryModule.categories[0]).toEqual(category)
    })
  })

  describe('add', () => {
    it('should add the category in the categories state', () => {
      organismCategoryModule.categories = [category]

      organismCategoryModule.add(anotherCategory)

      expect(organismCategoryModule.categories).toHaveLength(2)
      expect(organismCategoryModule.categories[0]).toEqual(category)
      expect(organismCategoryModule.categories[1]).toEqual(anotherCategory)
    })
  })

  describe('fetch', () => {
    it('should return the builded document categories from db when the request succeeds', async () => {
      const categoryEntities = [categoryEntity, anotherCategoryEntity];
      (getOrganismCategories as jest.Mock).mockResolvedValue(categoryEntities);
      (builder.fromDatabaseEntities as jest.Mock).mockResolvedValue([category, anotherCategory])

      const result = await organismCategoryModule.fetch()

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(category)
      expect(result[1]).toEqual(anotherCategory)
    })

    it('should throw the error when the request fails', async () => {
      const error = new Error('returned error from db');
      (getOrganismCategories as jest.Mock).mockRejectedValue(error)

      try {
        await organismCategoryModule.fetch()
        throw new Error("Organism category module didn't throw any error")
      } catch (err) {
        expect(err).toEqual(error)
      }
    })
  })

  describe('create', () => {
    it('should throw an error when a category with the same name already exists', async () => {
      organismCategoryModule.categories = [category]

      try {
        await organismCategoryModule.create(categoryName)
        throw new Error("Organism category module didn't throw any error")
      } catch (err) {
        expect(err.message).toBe(`Category with name ${categoryName} already exists`)
      }
    })

    it('should create the category in database', async () => {
      await organismCategoryModule.create(categoryName)

      expect(createOrganismCategory).toHaveBeenCalledTimes(1)
      expect(createOrganismCategory).toHaveBeenCalledWith(categoryName)
    })

    it('should return the created category', async () => {
      (createOrganismCategory as jest.Mock).mockReturnValue(categoryEntity);
      (builder.fromDatabaseEntity as jest.Mock).mockReturnValue(category)

      const result = await organismCategoryModule.create(categoryName)

      expect(builder.fromDatabaseEntity).toHaveBeenCalledTimes(1)
      expect(builder.fromDatabaseEntity).toHaveBeenCalledWith(categoryEntity)
      expect(result).toBe(category)
    })
  })
})
