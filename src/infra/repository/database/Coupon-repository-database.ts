import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/Coupon-repository";
import Connection from "../../database/Connection";

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly coonection: Connection) {}

  async findByCode(code: string): Promise<Coupon | undefined> {
    const [couponData] = await this.coonection.query('select * from ccca.coupon where code = $1', [code])
    if(!couponData) return
    return new Coupon(couponData.code, couponData.percentage, couponData.expire_date)
  }
}
