import RepositoryFactory from "../../domain/factory/Repository-factory";
import CouponRepository from "../../domain/repository/Coupon-repository";
import ItemRepository from "../../domain/repository/Item-repository";
import OrderRepository from "../../domain/repository/Order-repository";
import StockEntryRepository from "../../domain/repository/Stock-entry-repository";
import Connection from "../database/Connection";
import PgPromiseConnectionAdpter from "../database/Pg-promise-connection-adpter";
import CouponRepositoryDatabase from "../repository/database/Coupon-repository-database";
import ItemRepositoryDatabase from "../repository/database/Item-repository-database";
import OrderRepositoryDatabase from "../repository/database/Order-repository-database";
import StockEntryRepositoryDatabase from "../repository/database/Stock-entry-repository-database";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  private readonly connection: Connection

  constructor() {
    this.connection = PgPromiseConnectionAdpter.getInstance()
  }

  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.connection)
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection)
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection)
  }

  createStockEntryRepository(): StockEntryRepository {
    return new StockEntryRepositoryDatabase(this.connection)
  }
}
