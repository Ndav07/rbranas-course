import Item from "../entity/order/Item";

export default interface ItemRepository {
  findByid(idItem: number): Promise<Item | undefined>
}
