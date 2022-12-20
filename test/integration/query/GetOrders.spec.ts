import PlaceOrder from "../../../src/application/usecases/place-order/Place-order"
import Connection from "../../../src/infra/database/Connection"
import PgPromiseConnectionAdpter from "../../../src/infra/database/Pg-promise-connection-adpter"
import RepositoryFactory from "../../../src/domain/factory/Repository-factory"
import DatabaseRepositoryFactory from "../../../src/infra/factory/Database-repository-factory"
import GetOrders from "../../../src/application/query/get-orders/GetOrders"
import OrderDAO from "../../../src/application/dao/OrderDAO"
import OrderDAODatabase from "../../../src/infra/dao/OrderDAODatabase"
import Broker from "../../../src/infra/broker/Broker"

describe('Test query GetOrders', () => {
  let placeOrder: PlaceOrder
  let getOrders: GetOrders
  let connection: Connection
  let orderDAO: OrderDAO
  let repositoryFactory: RepositoryFactory

  beforeEach(() => {
    connection = PgPromiseConnectionAdpter.getInstance()
    repositoryFactory = new DatabaseRepositoryFactory()
    const broker = new Broker()
    placeOrder = new PlaceOrder(repositoryFactory, broker)
    orderDAO = new OrderDAODatabase(connection)
    getOrders = new GetOrders(orderDAO)
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