import GetOrder from "../../application/usecases/get-order/Get-order";
import GetOrderOutput from "../../application/usecases/get-order/Get-order-output";
import RepositoryFactory from "../../domain/factory/Repository-factory";

export default class GetOrderController {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  async execute(params: any, body: any): Promise<GetOrderOutput> {
    const getOder = new GetOrder(this.repositoryFactory)
    return await getOder.execute(body.code)
  }
}