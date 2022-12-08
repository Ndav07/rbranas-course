import RepositoryFactory from "../../domain/factory/Repository-factory";
import CouponRepository from "../../domain/repository/Coupon-repository";
import ItemRepository from "../../domain/repository/Item-repository";
import OrderRepository from "../../domain/repository/Order-repository";
import Connection from "../database/Connection";
import CouponRepositoryDatabase from "../repository/database/Coupon-repository-database";
import ItemRepositoryDatabase from "../repository/database/Item-repository-database";
import OrderRepositoryDatabase from "../repository/database/Order-repository-database";

export default class DatabaseRepositoryFactory implements RepositoryFactory {

  constructor(readonly connection: Connection) {}

  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.connection)
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection)
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection)
  }
}
