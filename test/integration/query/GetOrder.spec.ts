import PlaceOrder from "../../../src/application/usecases/place-order/Place-order";
import Connection from "../../../src/infra/database/Connection";
import PgPromiseConnectionAdpter from "../../../src/infra/database/Pg-promise-connection-adpter";
import RepositoryFactory from "../../../src/domain/factory/Repository-factory";
import DatabaseRepositoryFactory from "../../../src/infra/factory/Database-repository-factory";
import GetOrder from "../../../src/application/query/get-order/GetOrder";
import OrderDAO from "../../../src/application/dao/OrderDAO";
import OrderDAODatabase from "../../../src/infra/dao/OrderDAODatabase";

describe("Test query GetOrder", () => {
  let placeOrder: PlaceOrder
  let getOrder: GetOrder
  let connection: Connection
  let orderDAO: OrderDAO
  let repositoryFactory: RepositoryFactory

  beforeEach(() => {
    connection = PgPromiseConnectionAdpter.getInstance()
    repositoryFactory = new DatabaseRepositoryFactory(connection)
    placeOrder = new PlaceOrder(repositoryFactory)
    orderDAO = new OrderDAODatabase(connection)
    getOrder = new GetOrder(orderDAO)
  });

  afterEach(async () => {
    await repositoryFactory.createOrderRepository().clear()
  });

  it("should get an order", async () => {
    const input = {
      cpf: "839.435-452-10",
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      date: new Date("2022-12-10"),
      coupon: "VALE20",
    };
    const placeOrderOutput = await placeOrder.execute(input);
    const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
    expect(getOrderOutput.code).toBe("202200000001");
    expect(getOrderOutput.total).toBe(138);
  });
});
