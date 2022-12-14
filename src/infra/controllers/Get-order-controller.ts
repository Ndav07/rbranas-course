import OrderDAO from "../../application/dao/OrderDAO";
import GetOrder from "../../application/query/get-order/GetOrder";
import GetOrderOutput from "../../application/usecases/get-order/Get-order-output";
import Connection from "../database/Connection";

export default class GetOrderController {
  constructor(readonly orderDAO: OrderDAO) {}

  async execute(params: any, body: null): Promise<GetOrderOutput> {
    const getOder = new GetOrder(this.orderDAO);
    return await getOder.execute(params.code);
  }
}
