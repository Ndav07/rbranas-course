import OrderDAO from "../../application/dao/OrderDAO";
import GetOrders from "../../application/query/get-orders/GetOrders";
import GetOrdersOutput from "../../application/usecases/get-orders/Get-orders-output";
import Connection from "../database/Connection";

export default class GetOrdersController {
  constructor(readonly orderDAO: OrderDAO) {}

  async execute(params: null, body: null): Promise<GetOrdersOutput> {
    const getOders = new GetOrders(this.orderDAO)
    return await getOders.execute()
  }
}