import PlaceOrderController from "../controllers/Place-order-controller";
import Http from "./Http";
import RepositoryFactory from "../../domain/factory/Repository-factory";
import GetOrdersController from "../controllers/Get-orders-controller";
import GetOrderController from "../controllers/Get-order-controller";
import SimulateFreightController from "../controllers/Simulate-freight-controller";
import DefaultFreightCalculator from "../../domain/service/freight/Default-freight-calculator";
import ValidateCouponController from "../controllers/Validate-coupon-controller";
import OrderDAO from "../../application/dao/OrderDAO";

export default class RouteConfig {
  constructor(http: Http, repositoryFactory: RepositoryFactory, orderDAO: OrderDAO) {
    http.on('/orders', 'post', async (params: any, body: any) => {
      const placeOrderController = new PlaceOrderController(repositoryFactory)
      return placeOrderController.execute(params, body)
    })

    http.on('/orders', 'get', async (params: any, body: any) => {
      const getOrdersController = new GetOrdersController(orderDAO)
      return getOrdersController.execute(params, body)
    })

    http.on('/orders/:code', 'get', async (params: any, body: any) => {
      const getOrderController = new GetOrderController(orderDAO)
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
