import PlaceOrder from "../../application/usecases/place-order/Place-order"
import RepositoryFactory from "../../domain/factory/Repository-factory"

export default class PlaceOrderController {

  constructor(readonly repositoryFactory: RepositoryFactory) {}

  async execute(params: any, body: any) {
    const placeOrder = new PlaceOrder(this.repositoryFactory)
    const input = body
    input.date = new Date(input.date)
    return await placeOrder.execute(input)
  }
}
