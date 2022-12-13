import ValidateCoupon from "../../application/usecases/validate-coupon/Validate-coupon";
import RepositoryFactory from "../../domain/factory/Repository-factory";

export default class ValidateCouponController {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  async execute(params: null, body: any): Promise<boolean> {
    const validateCoupon = new ValidateCoupon(this.repositoryFactory)
    const input = body.code
    return await validateCoupon.execute(input)
  }
}