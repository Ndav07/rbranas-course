import Order from "../entity/order/Order";

export default interface OrderRepository {
  save(order: Order): Promise<void>
  count(): Promise<number>
  clear(): Promise<void> 
} 
