import PlaceOrder from "../../application/usecases/place-order/Place-order"
import PlaceOrderOutput from "../../application/usecases/place-order/Place-order-output"
import RepositoryFactory from "../../domain/factory/Repository-factory"


export default class PlaceOrderController {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  async execute(params: null, body: any): Promise<PlaceOrderOutput> {
    const placeOrder = new PlaceOrder(this.repositoryFactory)
    const input = body
    input.date = new Date(input.date)
    return await placeOrder.execute(input)
  }
}
