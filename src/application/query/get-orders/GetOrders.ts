import OrderDAO from "../../dao/OrderDAO"
import GetOrdersOutput from "./GetOrdersOutput"

export default class GetOrders {
  constructor(readonly orderDAO: OrderDAO) {}

  async execute(): Promise<GetOrdersOutput> {
    const orders = await this.orderDAO.findAll()
    const getOrdersOutput = new GetOrdersOutput()
    for(const order of orders) {
      getOrdersOutput.addOrder(order.code, order.total)
    }
    return getOrdersOutput
  }
}