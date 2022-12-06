import ValidateCPF from '../Validate-cpf'
import Item from '../Item'
import OrderItem from './Order-item'
import Coupon from '../Coupon'
import FreightCalculator from '../Freight-calculator'
import DefaultFreightCalculator from '../Default-freight-calculator'
import OrderCode from './Order-code'

export default class Order {
  private cpf: ValidateCPF
  private coupon: Coupon | undefined
  private orderItems: OrderItem[]
  private freight: number
  private code: OrderCode

  constructor(
    cpf: string, 
    readonly date: Date = new Date(), 
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
    readonly sequence: number = 1
  ) {
    this.cpf = new ValidateCPF(cpf)
    this.orderItems = []
    this.freight = 0 
    this.code = new OrderCode(date, sequence)
  }

  addItem(item: Item, quantity: number): void {
    this.freight += this.freightCalculator.calculate(item) * quantity
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity))
  }

  addCoupon(coupon: Coupon): void {
    if(coupon.isValid(this.date)){
      this.coupon = coupon
    }
  }

  getFreight(): number {
    return this.freight
  }

  getCode(): string {
    return this.code.value
  }

  getCpf(): string {
    return this.cpf.value
  }

  getCouponCode(): string | undefined {
    return this.coupon?.code
  }

  getOrderItems(): OrderItem[] {
    return this.orderItems
  }

  getTotal(): number {
    let total = 0
    for(const orderItem of this.orderItems) {
      total += orderItem.getTotal()
    }
    if(this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date)
    }
    total += this.getFreight()
    return total
  }
}
