import PlaceOrder from "../../../src/application/usecases/place-order/Place-order"
import RepositoryFactory from "../../../src/domain/factory/Repository-factory"
import DatabaseRepositoryFactory from "../../../src/infra/factory/Database-repository-factory"
import GetOrders from "../../../src/application/usecases/get-orders/Get-orders"

describe('Test GetOrders', () => {
  let placeOrder: PlaceOrder
  let getOrders: GetOrders
  let repositoryFactory: RepositoryFactory

  beforeEach(() => {
    repositoryFactory = new DatabaseRepositoryFactory()
    placeOrder = new PlaceOrder(repositoryFactory)
    getOrders = new GetOrders(repositoryFactory)
  })

  afterEach(async () => {
    await repositoryFactory.createOrderRepository().clear()
  })

  it('should get all order', async () => {
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
    await placeOrder.execute(input)
    const getOrdersOutput = await getOrders.execute()
    expect(getOrdersOutput.orders).toHaveLength(1)
  })
})