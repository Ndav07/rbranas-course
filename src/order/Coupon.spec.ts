import Coupon from "./Coupon"

describe('Test Coupon', () => {
  it('should create a discount coupon valid', () => {
    const coupon = new Coupon('VALE20', 20)
    const isValid = coupon.isValid()
    expect(isValid).toBeTruthy()
  })
})
