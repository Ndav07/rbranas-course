import CouponRepository from "../repository/Coupon-repository";
import ItemRepository from "../repository/Item-repository";
import OrderRepository from "../repository/Order-repository";
import StockEntryRepository from "../repository/Stock-entry-repository";

export default interface RepositoryFactory {
  createItemRepository(): ItemRepository
  createCouponRepository(): CouponRepository
  createOrderRepository(): OrderRepository
  createStockEntryRepository(): StockEntryRepository
}
