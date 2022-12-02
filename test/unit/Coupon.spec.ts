import Coupon from "../../src/domain/entity/order/Coupon"

describe('Test Coupon', () => {
  it('should create a discount coupon valid', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2022-12-10'))
    const today = new Date('2022-12-01') 
    const isValid = coupon.isValid(today)
    expect(isValid).toBeTruthy()
  })

  it('should create a discount coupon invalid', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2022-02-10'))
    const today = new Date('2022-12-01')
    const isValid = coupon.isValid(today)
    expect(isValid).toBeFalsy()
  })

  it('should create a discount coupon valid and calculate the discount', () => {
    const coupon = new Coupon('VALE20', 20)
    const discount = coupon.calculateDiscount(1000, new Date())
    expect(discount).toBe(200)
  })

  it('should create a discou invalid and calculate the discount', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2022-02-10'))
    const discount = coupon.calculateDiscount(1000, new Date())
    expect(discount).toBe(0)
  })
})
