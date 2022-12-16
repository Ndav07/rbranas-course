import ValidateCoupon from "../../../src/application/usecases/validate-coupon/Validate-coupon"
import DatabaseRepositoryFactory from "../../../src/infra/factory/Database-repository-factory"

describe('Test validate coupon', () => {
  it('should validation a discount coupon', async () => {
    const repositoryFactory = new DatabaseRepositoryFactory() 
    const validateCoupon = new ValidateCoupon(repositoryFactory)
    const isValid = await validateCoupon.execute('VALE20')
    expect(isValid).toBeTruthy()
  })
})
