import PlaceOrder from "../../../src/application/usecases/place-order/Place-order"
import RepositoryFactory from "../../../src/domain/factory/Repository-factory"
import DatabaseRepositoryFactory from "../../../src/infra/factory/Database-repository-factory"
import GetOrder from "../../../src/application/usecases/get-order/Get-order"
import Broker from "../../../src/infra/broker/Broker"

describe('Test GetOrder', () => {
  let placeOrder: PlaceOrder
  let getOrder: GetOrder
  let repositoryFactory: RepositoryFactory

  beforeEach(() => {
    repositoryFactory = new DatabaseRepositoryFactory()
    const broker = new Broker()
    placeOrder = new PlaceOrder(repositoryFactory, broker)
    getOrder = new GetOrder(repositoryFactory)
  })

  afterEach(async () => {
    await repositoryFactory.createOrderRepository().clear()
  })

  it('should get an order', async () => {
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
    const placeOrderOutput = await placeOrder.execute(input)
    const getOrderOutput = await getOrder.execute(placeOrderOutput.code)
    expect(getOrderOutput.code).toBe('202200000001')
    expect(getOrderOutput.total).toBe(138)
  })
})
