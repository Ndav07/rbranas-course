import ValidateCPF from '../validationCPF/Validate-cpf'
import Item from './Item'
import OrderItem from './Order-item'
import Coupon from './Coupon'

export default class Order {
  cpf: ValidateCPF
  orderItems: OrderItem[]
  coupon: Coupon | undefined

  constructor(cpf: string, readonly date: Date = new Date()) {
    this.cpf = new ValidateCPF(cpf)
    this.orderItems = []
  }

  addItem(item: Item, quantity: number): void {
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity))
  }

  addCoupon(coupon: Coupon): void {
    if(coupon.isValid(this.date)){
      this.coupon = coupon
    }
  }

  getTotal(): number {
    let total = 0
    for(const orderItem of this.orderItems) {
      total += orderItem.getTotal()
    }
    if(this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date)
    }
    return total
  }
}