import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/Coupon-repository";

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[]

  constructor() {
    this.coupons = [
      new Coupon('VALE20', 20)
    ]
  }

  async findByCode(code: string): Promise<Coupon | undefined > {
    return this.coupons.find(coupon => coupon.code === code)
  }
}
