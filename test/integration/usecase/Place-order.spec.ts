import OrderPlacedStockHandler from "../../../src/application/handler/Order-placed-stock-handler"
import GetStock from "../../../src/application/usecases/get-stock/Get-stock"
import PlaceOrder from "../../../src/application/usecases/place-order/Place-order"
import RepositoryFactory from "../../../src/domain/factory/Repository-factory"
import StockEntryRepository from "../../../src/domain/repository/Stock-entry-repository"
import Broker from "../../../src/infra/broker/Broker"
import DatabaseRepositoryFactory from "../../../src/infra/factory/Database-repository-factory"

describe('Test PlaceOrder', () => {
  let placeOrder: PlaceOrder
  let repositoryFactory: RepositoryFactory
  let stockEntryRepository: StockEntryRepository
  let getStock: GetStock

  beforeEach(() => {
    repositoryFactory = new DatabaseRepositoryFactory()
    const broker = new Broker()
    broker.register(new OrderPlacedStockHandler(repositoryFactory))
    placeOrder = new PlaceOrder(repositoryFactory, broker)
    stockEntryRepository = repositoryFactory.createStockEntryRepository()
    getStock = new GetStock(repositoryFactory)
  })

  afterEach(async () => {
    await repositoryFactory.createOrderRepository().clear()
    await stockEntryRepository.clear()
  })

  it('should place an order', async () => {
    const input = {
      cpf: '839.435-452-10',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      date: new Date('2022-12-10'),
      coupon: 'VALE20'
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(138)
  })

  it('should place an order with freight calculate without coupon', async () => {
    const input = {
      cpf: '839.435-452-10',
      orderItems: [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 },
      ],
      date: new Date('2022-12-10')
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(6350)
  })

  it('should place an order with code', async () => {
    const input = {
      cpf: '839.435-452-10',
      orderItems: [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 },
      ],
      date: new Date('2022-12-10')
    }
    const output = await placeOrder.execute(input)
    expect(output.code).toBe('202200000001')
  })

  it('should place an order and remove of stock', async () => {
    const input = {
      cpf: '839.435-452-10',
      orderItems: [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 },
      ],
      date: new Date('2022-12-10')
    }
    await placeOrder.execute(input)
    const totala = await getStock.execute(4)
    const totalb = await getStock.execute(5)
    const totalc = await getStock.execute(6)
    expect(totala).toBe(-1)
    expect(totalb).toBe(-1)
    expect(totalc).toBe(-3)
  })
})
