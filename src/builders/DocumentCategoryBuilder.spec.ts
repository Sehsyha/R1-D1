import { DocumentCategoryEntity } from '@/db/documentCategory/types'
import { DocumentCategory } from '@/models/documentCategory'
import { DocumentCategoryBuilder } from './DocumentCategoryBuilder'

describe('DocumentCategoryBuilder', () => {
  const id = 'ID'
  const name = 'category name'
  describe('create', () => {
    it('should return a new CategoryBuilder each time create is called', () => {
      const firstBuilder = DocumentCategoryBuilder.create()
      const secondBuilder = DocumentCategoryBuilder.create()

      expect(firstBuilder).not.toBe(secondBuilder)
    })
  })

  describe('fromDatabaseEntity', () => {
    let builder: DocumentCategoryBuilder

    beforeEach(() => {
      builder = DocumentCategoryBuilder.create()
    })

    it('should throw an error when database entity does not have an id', () => {
      const documentCategoryEntity: DocumentCategoryEntity = {
        name
      }
      try {
        builder.fromDatabaseEntity(documentCategoryEntity)
        throw new Error("Builder didn't return any error")
      } catch (err) {
        expect(err.message).toBe('Document category entity id must be defined')
      }
    })

    it('should create a new document category from a document category entity', () => {
      const documentCategoryEntity: DocumentCategoryEntity = {
        _id: id,
        name
      }

      const expectedResult: DocumentCategory = {
        id,
        name
      }

      const result = builder.fromDatabaseEntity(documentCategoryEntity)

      expect(result).toEqual(expectedResult)
    })
  })
})
