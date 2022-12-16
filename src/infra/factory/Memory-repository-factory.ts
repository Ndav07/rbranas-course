import RepositoryFactory from "../../domain/factory/Repository-factory";
import CouponRepository from "../../domain/repository/Coupon-repository";
import ItemRepository from "../../domain/repository/Item-repository";
import OrderRepository from "../../domain/repository/Order-repository";
import StockEntryRepository from "../../domain/repository/Stock-entry-repository";
import CouponRepositoryMemory from "../repository/memory/Coupon-repository-memory";
import ItemRepositoryMemory from "../repository/memory/Item-repository-memory";
import OrderRepositoryMemory from "../repository/memory/Order-repository-memory";
import StockEntryRepositoryMemory from "../repository/memory/Stock-entry-repository-memory";

export default class MemoryRepositoryFactory implements RepositoryFactory {

  createItemRepository(): ItemRepository {
    return new ItemRepositoryMemory()
  }
  
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory()
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryMemory()
  }

  createStockEntryRepository(): StockEntryRepository {
    return new StockEntryRepositoryMemory()
  }
}
