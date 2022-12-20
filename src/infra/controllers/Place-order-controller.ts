import PlaceOrder from "../../application/usecases/place-order/Place-order"
import PlaceOrderOutput from "../../application/usecases/place-order/Place-order-output"
import RepositoryFactory from "../../domain/factory/Repository-factory"
import Broker from "../broker/Broker"

export default class PlaceOrderController {
  constructor(readonly repositoryFactory: RepositoryFactory, readonly broker: Broker) {}

  async execute(params: null, body: any): Promise<PlaceOrderOutput> {
    const placeOrder = new PlaceOrder(this.repositoryFactory, this.broker)
    const input = body
    input.date = new Date(input.date)
    return await placeOrder.execute(input)
  }
}
