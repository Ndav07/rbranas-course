import CouponRepository from "../repository/Coupon-repository";
import ItemRepository from "../repository/Item-repository";
import OrderRepository from "../repository/Order-repository";

export default interface RepositoryFactory {
  createItemRepository(): ItemRepository
  createCouponRepository(): CouponRepository
  createOrderRepository(): OrderRepository
}
