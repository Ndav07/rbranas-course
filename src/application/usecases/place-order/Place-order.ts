import DefaultFreightCalculator from "../../../domain/entity/Default-freight-calculator";
import Order from "../../../domain/entity/order/Order";
import RepositoryFactory from "../../../domain/factory/Repository-factory";
import CouponRepository from "../../../domain/repository/Coupon-repository";
import ItemRepository from "../../../domain/repository/Item-repository";
import OrderRepository from "../../../domain/repository/Order-repository";
import PlaceOrderInput from "./Place-order-input";
import PlaceOrderOutput from "./Place-order-output";

export default class PlaceOrder {
  itemRepository: ItemRepository
  couponRepository: CouponRepository
  orderRepository: OrderRepository

  constructor(readonly repositoryFactory: RepositoryFactory) { 
    this.itemRepository = repositoryFactory.createItemRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
  } 

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = await this.orderRepository.count() + 1
    const order = new Order(input.cpf, input.date, new DefaultFreightCalculator(), sequence)
    for(const orderItem of input.orderItems) {
      const item = await this.itemRepository.findByid(orderItem.idItem)
      if(!item) throw new Error('Item not found')
      order.addItem(item, orderItem.quantity)
    }
    if(input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon)
      if(coupon) order.addCoupon(coupon)
    }
    await this.orderRepository.save(order)
    const total = order.getTotal()
    const output = new PlaceOrderOutput(order.getCode(), total)
    return output
  }
}
