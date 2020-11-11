import { DocumentCategoryBuilder } from '@/builders/DocumentCategoryBuilder'
import { createDocumentCategory, getDocumentCategories } from '@/db/documentCategory/requests'
import { DocumentCategoryEntity } from '@/db/documentCategory/types'
import { DocumentCategory } from '@/models/documentCategory'
import { DocumentCategoryModule } from './DocumentCategoryModule'

jest.mock('@/db/documentCategory/requests')

describe('DocumentCategoryModule', () => {
  let documentCategoryModule: DocumentCategoryModule
  let builder: DocumentCategoryBuilder
  const categoryId = 'category id'
  const categoryName = 'category name'
  const category: DocumentCategory = {
    id: categoryId,
    name: categoryName
  }

  const categoryEntity: DocumentCategoryEntity = {
    _id: categoryId,
    name: categoryName
  }

  const anotherCategoryId = 'another category id'
  const anotherCategoryName = 'another category name'
  const anotherCategory: DocumentCategory = {
    id: anotherCategoryId,
    name: anotherCategoryName
  }
  const anotherCategoryEntity: DocumentCategoryEntity = {
    _id: anotherCategoryId,
    name: anotherCategoryName
  }

  beforeEach(() => {
    documentCategoryModule = new DocumentCategoryModule(DocumentCategoryModule)

    builder = new DocumentCategoryBuilder()
    builder.fromDatabaseEntities = jest.fn()
    builder.fromDatabaseEntity = jest.fn()
    DocumentCategoryBuilder.create = jest.fn().mockReturnValue(builder)
  })

  describe('initial state', () => {
    it('should initialize categories to an empty array', () => {
      expect(documentCategoryModule.categories).toEqual([])
    })
  })

  describe('all', () => {
    it('should return categories from module', () => {
      documentCategoryModule.categories = [category, anotherCategory]

      const result = documentCategoryModule.all

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(category)
      expect(result[1]).toEqual(anotherCategory)
    })
  })

  describe('one', () => {
    it('should return the category when it is found', () => {
      documentCategoryModule.categories = [anotherCategory, category]

      const result = documentCategoryModule.one(categoryId)

      expect(result).toEqual(category)
    })

    it('should return undefined when the category is not found', () => {
      documentCategoryModule.categories = [anotherCategory]

      const result = documentCategoryModule.one(categoryId)

      expect(result).toBeUndefined()
    })
  })

  describe('set', () => {
    it('should the categories in state', () => {
      const categories = [category]

      documentCategoryModule.set(categories)

      expect(documentCategoryModule.categories).toHaveLength(1)
      expect(documentCategoryModule.categories[0]).toEqual(category)
    })
  })

  describe('add', () => {
    it('should add the category in the categories state', () => {
      documentCategoryModule.categories = [category]

      documentCategoryModule.add(anotherCategory)

      expect(documentCategoryModule.categories).toHaveLength(2)
      expect(documentCategoryModule.categories[0]).toEqual(category)
      expect(documentCategoryModule.categories[1]).toEqual(anotherCategory)
    })
  })

  describe('fetch', () => {
    it('should return the builded document categories from db when the request succeeds', async () => {
      const categoryEntities = [categoryEntity, anotherCategoryEntity];
      (getDocumentCategories as jest.Mock).mockResolvedValue(categoryEntities);
      (builder.fromDatabaseEntities as jest.Mock).mockResolvedValue([category, anotherCategory])

      const result = await documentCategoryModule.fetch()

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(category)
      expect(result[1]).toEqual(anotherCategory)
    })

    it('should throw the error when the request fails', async () => {
      const error = new Error('returned error from db');
      (getDocumentCategories as jest.Mock).mockRejectedValue(error)

      try {
        await documentCategoryModule.fetch()
        throw new Error("Document category module didn't throw any error")
      } catch (err) {
        expect(err).toEqual(error)
      }
    })
  })

  describe('create', () => {
    it('should throw an error when a category with the same name already exists', async () => {
      documentCategoryModule.categories = [category]

      try {
        await documentCategoryModule.create(categoryName)
        throw new Error("Document category module didn't throw any error")
      } catch (err) {
        expect(err.message).toBe(`Category with name ${categoryName} already exists`)
      }
    })

    it('should create the category in database', async () => {
      await documentCategoryModule.create(categoryName)

      expect(createDocumentCategory).toHaveBeenCalledTimes(1)
      expect(createDocumentCategory).toHaveBeenCalledWith(categoryName)
    })

    it('should return the created category', async () => {
      (createDocumentCategory as jest.Mock).mockReturnValue(categoryEntity);
      (builder.fromDatabaseEntity as jest.Mock).mockReturnValue(category)

      const result = await documentCategoryModule.create(categoryName)

      expect(builder.fromDatabaseEntity).toHaveBeenCalledTimes(1)
      expect(builder.fromDatabaseEntity).toHaveBeenCalledWith(categoryEntity)
      expect(result).toBe(category)
    })
  })
})
