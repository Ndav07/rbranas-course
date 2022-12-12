import PlaceOrderController from "../controllers/Place-order-controller";
import Http from "./Http";
import RepositoryFactory from "../../domain/factory/Repository-factory";

export default class RouteConfig {
  constructor(http: Http, repositoryFactory: RepositoryFactory) {
    http.on('/orders', 'post', async (params: any, body: any) => {
      const placeOrderController = new PlaceOrderController(repositoryFactory)
      return placeOrderController.execute(params, body)
    })
  }
}
