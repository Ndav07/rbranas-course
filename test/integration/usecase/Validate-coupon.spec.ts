import ValidateCoupon from "../../../src/application/usecases/validate-coupon/Validate-coupon"
import PgPromiseConnectionAdpter from "../../../src/infra/database/Pg-promise-connection-adpter"
import DatabaseRepositoryFactory from "../../../src/infra/factory/Database-repository-factory"

describe('Test validate coupon', () => {
  it('should validation a discount coupon', async () => {
    const connection = PgPromiseConnectionAdpter.getInstance()
    const repositoryFactory = new DatabaseRepositoryFactory(connection) 
    const validateCoupon = new ValidateCoupon(repositoryFactory)
    const isValid = await validateCoupon.execute('VALE20')
    expect(isValid).toBeTruthy()
  })
})
