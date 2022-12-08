import PlaceOrder from "../../src/application/usecases/place-order/Place-order"
import Connection from "../../src/infra/database/Connection"
import PgPromiseConnectionAdpter from "../../src/infra/database/Pg-promise-connection-adpter"
import RepositoryFactory from "../../src/domain/factory/Repository-factory"
import DatabaseRepositoryFactory from "../../src/infra/factory/Database-repository-factory"
import MemoryRepositoryFactory from "../../src/infra/factory/Memory-repository-factory"

describe('Test PlaceOrder', () => {
  let placeOrder: PlaceOrder
  let connection: Connection
  let repositoryFactory: RepositoryFactory

  beforeEach(() => {
    connection = PgPromiseConnectionAdpter.getInstance()
    repositoryFactory = new DatabaseRepositoryFactory(connection)
    placeOrder = new PlaceOrder(repositoryFactory)
  })

  afterEach(async () => {
    await repositoryFactory.createOrderRepository().clear()
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
})
