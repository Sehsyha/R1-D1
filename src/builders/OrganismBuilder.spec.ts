import { OrganismEntity } from '@/db/organism/entitiy.types'
import { OrganismCategoryEntity } from '@/db/organismCategory/types'
import { OrganismBuilder } from './OrganismBuilder'

describe('OrganismBuilder', () => {
  const id = 'ID'
  const name = 'organism name'
  describe('create', () => {
    it('should return a new OrganismBuilder each time create is called', () => {
      const firstBuilder = OrganismBuilder.create()
      const secondBuilder = OrganismBuilder.create()

      expect(firstBuilder).not.toBe(secondBuilder)
    })
  })

  describe('fromDatabaseEntity', () => {
    let builder: OrganismBuilder

    beforeEach(() => {
      builder = OrganismBuilder.create()
    })

    it('should throw an error when database entity does not have an id', () => {
      const organismEntity: OrganismEntity = {
        name
      }
      try {
        builder.fromDatabaseEntity(organismEntity)
        throw new Error("Builder didn't return any error")
      } catch (err) {
        expect(err.message).toBe('Organism entity id must be defined')
      }
    })

    it('should create a new organism from an organism entity', () => {
      const organismEntity: OrganismEntity = {
        _id: id,
        name
      }

      const result = builder.fromDatabaseEntity(organismEntity)

      expect(result.id).toBe(id)
      expect(result.name).toBe(name)
      expect(result.category).toBeUndefined()
    })

    it('should does not add any category when organism category is not find in builder categories', () => {
      const organismEntity: OrganismEntity = {
        _id: id,
        name,
        categoryId: 'unknown id'
      }

      const result = builder.fromDatabaseEntity(organismEntity)

      expect(result.category).toBeUndefined()
    })

    it('should add category when organism category is found', () => {
      const categoryId = 'category id'
      const categoryName = 'category name'
      const categoryEntity: OrganismCategoryEntity = {
        _id: categoryId,
        name: categoryName
      }

      const organismEntity: OrganismEntity = {
        _id: id,
        name,
        categoryId
      }

      builder.withCategoryEntities([categoryEntity])

      const result = builder.fromDatabaseEntity(organismEntity)

      expect(result.category).toBeDefined()

      if (result.category) {
        expect(result.category.id).toBe(categoryId)
        expect(result.category.name).toBe(categoryName)
      }
    })
  })
})
