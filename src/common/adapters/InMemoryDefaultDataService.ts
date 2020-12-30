import { ServiceFactory } from '../factories/ServiceFactory'

export class InMemoryDefaultDataService {
  public static async insertDefaultData(): Promise<void> {
    const organismCategoryService = ServiceFactory.getOrganismCategoryService()
    const organismCategory1 = await organismCategoryService.create('Cotisations')

    const organismService = ServiceFactory.getOrganismService()
    await organismService.create('URSSAF', organismCategory1.getId())

    const documentCategoryService = ServiceFactory.getDocumentCategoryService()
    await documentCategoryService.create('Factures')
    await documentCategoryService.create('Devis')
  }
}
