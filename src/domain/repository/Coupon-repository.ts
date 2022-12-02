import Coupon from "../entity/order/Coupon";

export default interface CouponRepository {
  findByCode(code: string): Promise<Coupon | undefined>
}
