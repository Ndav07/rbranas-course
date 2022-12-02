import Order from "../../domain/entity/order/Order";
import CouponRepository from "../../domain/repository/Coupon-repository";
import ItemRepository from "../../domain/repository/Item-repository";
import OrderRepository from "../../domain/repository/Order-repository";
import PlaceOrderInput from "./Place-order-input";
import PlaceOrderOutput from "./Place-order-output";

export default class PlaceOrder {

  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly orderRepository: OrderRepository,
    private readonly couponRepository: CouponRepository
  ) { }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(input.cpf, input.date)
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
    const output = new PlaceOrderOutput(total)
    return output
  }
}
