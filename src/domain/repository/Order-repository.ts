import Order from "../entity/order/Order";

export default interface OrderRepository {
  get(code: string): Promise<Order>
  findAll(): Promise<Order[]> 
  save(order: Order): Promise<void>
  count(): Promise<number>
  clear(): Promise<void>
} 
