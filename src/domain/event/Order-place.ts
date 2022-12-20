import DomainEvent from "../../infra/broker/Domain-event";
import Order from "../entity/order/Order";

export default class OrderPlaced implements DomainEvent {
  name = 'OrderPlaced'
  constructor(readonly order: Order) {}
}
