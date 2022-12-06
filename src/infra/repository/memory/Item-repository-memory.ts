import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/Item-repository";

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[]

  constructor() {
    this.items = [
      new Item(1, 'Music', 'CD', 30),
      new Item(2, 'Video', 'DVD', 50),
      new Item(3, 'Video', 'VHS', 10),
      new Item(4, 'Musical Instruments', 'Guitar', 1000, 100, 30, 10, 3),
      new Item(5, 'Musical Instruments', 'Amplifier', 5000, 100, 50, 50, 20),
      new Item(6, 'Accessories', 'Cable', 30, 10, 10, 10, 0.9) 
    ]
  }

  async findByid(idItem: number): Promise<Item | undefined> {
    return this.items.find(item => item.idItem === idItem)
  }
}
