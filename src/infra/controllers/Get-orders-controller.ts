import GetOrders from "../../application/usecases/get-orders/Get-orders";
import GetOrdersOutput from "../../application/usecases/get-orders/Get-orders-output";
import RepositoryFactory from "../../domain/factory/Repository-factory";

export default class GetOrdersController {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  async execute(params: null, body: null): Promise<GetOrdersOutput> {
    const getOders = new GetOrders(this.repositoryFactory)
    return await getOders.execute()
  }
}