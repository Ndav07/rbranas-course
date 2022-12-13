import RepositoryFactory from "../../../domain/factory/Repository-factory";
import CouponRepository from "../../../domain/repository/Coupon-repository";

export default class ValidateCoupon {
  couponRepository: CouponRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.couponRepository = repositoryFactory.createCouponRepository()
  }

  async execute(code: string): Promise<boolean> {
    const coupon = await this.couponRepository.findByCode(code)
    if(!coupon) throw new Error('Invalid coupon')
    return coupon.isValid()
  }
}
