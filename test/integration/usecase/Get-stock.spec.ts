import GetStock from "../../../src/application/usecases/get-stock/Get-stock"
import SaveStock from "../../../src/application/usecases/save-stock/Save-stock"
import RepositoryFactory from "../../../src/domain/factory/Repository-factory"
import DatabaseRepositoryFactory from "../../../src/infra/factory/Database-repository-factory"

describe('Test get stock', () => {
  let repositoryFactory: RepositoryFactory

  beforeEach(async () => {
    repositoryFactory = new DatabaseRepositoryFactory()
    await repositoryFactory.createStockEntryRepository().clear()
  })

  afterEach(async () => {
    await repositoryFactory.createStockEntryRepository().clear()
  })

  it('should get stock of an item', async () => {
    const saveStock = new SaveStock(repositoryFactory)
    const saveStockInputa = {
      idItem: 1,
      operation: 'in',
      quantity: 10
    }
    await saveStock.execute(saveStockInputa)
    const saveStockInputb = {
      idItem: 1,
      operation: 'out',
      quantity: 5
    }
    await saveStock.execute(saveStockInputb)
    const getStock = new GetStock(repositoryFactory)
    const total = await getStock.execute(1)
    expect(total).toBe(5)
  })
})
