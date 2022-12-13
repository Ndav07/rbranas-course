import PlaceOrderController from "../controllers/Place-order-controller";
import Http from "./Http";
import RepositoryFactory from "../../domain/factory/Repository-factory";
import GetOrdersController from "../controllers/Get-orders-controller";
import GetOrderController from "../controllers/Get-order-controller";
import SimulateFreightController from "../controllers/Simulate-freight-controller";
import DefaultFreightCalculator from "../../domain/entity/Default-freight-calculator";
import ValidateCouponController from "../controllers/Validate-coupon-controller";

export default class RouteConfig {
  constructor(http: Http, repositoryFactory: RepositoryFactory) {
    http.on('/orders', 'post', async (params: any, body: any) => {
      const placeOrderController = new PlaceOrderController(repositoryFactory)
      return placeOrderController.execute(params, body)
    })

    http.on('/orders', 'get', async (params: any, body: any) => {
      const getOrdersController = new GetOrdersController(repositoryFactory)
      return getOrdersController.execute(params, body)
    })

    http.on('/order', 'get', async (params: any, body: any) => {
      const getOrderController = new GetOrderController(repositoryFactory)
      return getOrderController.execute(params, body)
    })

    http.on('/simulateFreight', 'post', async (params: any, body: any) => {
      const simulateFreightController = new SimulateFreightController(repositoryFactory, new DefaultFreightCalculator())
      return simulateFreightController.execute(params, body)
    })

    http.on('/validateCoupon', 'post', async (params: any, body: any) => {
      const validateCouponController = new ValidateCouponController(repositoryFactory)
      return validateCouponController.execute(params, body)
    })
  }
}
