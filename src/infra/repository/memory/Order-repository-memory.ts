import Order from "../../../domain/entity/order/Order";
import OrderRepository from "../../../domain/repository/Order-repository";

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[]

  constructor() {
    this.orders = []
  }
  
  async save(order: Order): Promise<void> {
    this.orders.push(order)
  }
}