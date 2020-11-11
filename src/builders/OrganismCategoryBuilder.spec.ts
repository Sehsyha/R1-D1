import { OrganismCategoryEntity } from '@/db/organismCategory/types'
import { OrganismCategory } from '@/models/organismCategory'
import { OrganismCategoryBuilder } from './OrganismCategoryBuilder'

describe('OrganismCategoryBuilder', () => {
  const id = 'ID'
  const name = 'category name'

  describe('create', () => {
    it('should return a new CategoryBuilder each time create is called', () => {
      const firstBuilder = OrganismCategoryBuilder.create()
      const secondBuilder = OrganismCategoryBuilder.create()

      expect(firstBuilder).not.toBe(secondBuilder)
    })
  })

  describe('fromDatabaseEntity', () => {
    let builder: OrganismCategoryBuilder

    beforeEach(() => {
      builder = OrganismCategoryBuilder.create()
    })

    it('should throw an error when database entity does not have an id', () => {
      const organismCategoryEntity: OrganismCategoryEntity = {
        name
      }

      try {
        builder.fromDatabaseEntity(organismCategoryEntity)
        throw new Error("Builder didn't return any error")
      } catch (err) {
        expect(err.message).toBe('Organism category entity id must be defined')
      }
    })

    it('should create a new organism category from an organism category entity', () => {
      const organismCategoryEntity: OrganismCategoryEntity = {
        _id: id,
        name
      }

      const expectedResult: OrganismCategory = {
        id,
        name
      }

      const result = builder.fromDatabaseEntity(organismCategoryEntity)

      expect(result).toEqual(expectedResult)
    })
  })
})
