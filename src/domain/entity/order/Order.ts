import ValidateCPF from './Validate-cpf'
import Item from './Item'
import OrderItem from './Order-item'
import Coupon from './Coupon'
import FreightCalculator from './Freight-calculator'
import DefaultFreightCalculator from './Default-freight-calculator'

export default class Order {
  cpf: ValidateCPF
  private orderItems: OrderItem[]
  private coupon: Coupon | undefined
  private freight: number

  constructor(
    cpf: string, 
    readonly date: Date = new Date(), 
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator()
    ) {
    this.cpf = new ValidateCPF(cpf)
    this.orderItems = []
    this.freight = 0
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
