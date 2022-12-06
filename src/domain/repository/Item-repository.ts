import Item from "../entity/Item";

export default interface ItemRepository {
  findByid(idItem: number): Promise<Item | undefined>
}
