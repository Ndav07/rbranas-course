export default class Coupon {
  constructor(
    readonly code: string, 
    readonly percentage: number, 
    readonly expireDate?: Date
  ) {}
  
  isValid(today: Date = new Date()): boolean {
    if(!this.expireDate) return true
    return this.expireDate.getTime() >= today.getTime()
  }

  calculateDiscount(amount: number, today: Date): number {
    if(!this.isValid(today)) return 0
    return (amount * this.percentage / 100)
  }
}
