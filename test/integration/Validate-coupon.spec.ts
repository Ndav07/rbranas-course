import ValidateCoupon from "../../src/application/usecases/validate-coupon/Validate-coupon"
import PgPromiseConnectionAdpter from "../../src/infra/database/Pg-promise-connection-adpter"
import CouponRepositoryDatabase from "../../src/infra/repository/database/Coupon-repository-database"

describe('Test validate coupon', () => {
  it('should validation a discount coupon', async () => {
    const connection = PgPromiseConnectionAdpter.getInstance()
    const couponRepository = new CouponRepositoryDatabase(connection) 
    const validateCoupon = new ValidateCoupon(couponRepository)
    const isValid = await validateCoupon.execute('VALE20')
    expect(isValid).toBeTruthy()
  })
})
