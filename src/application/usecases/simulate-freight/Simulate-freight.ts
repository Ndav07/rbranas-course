import FreightCalculator from "../../../domain/entity/Freight-calculator";
import RepositoryFactory from "../../../domain/factory/Repository-factory";
import ItemRepository from "../../../domain/repository/Item-repository";
import SimulateFreightInput from "./Simulate-freight-input";
import SimulateFreightOutput from "./Simulate-freight-output";

export default class SimulateFreight {
  itemRepository: ItemRepository

  constructor(
    readonly repositoryFactory: RepositoryFactory, 
    readonly freightCalculator: FreightCalculator
  ) {
    this.itemRepository = repositoryFactory.createItemRepository()
  }

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    let amount = 0
    for(const inputItem of input.items) {
      const item = await this.itemRepository.findByid(inputItem.idItem)
      if(!item) throw new Error('Item not found')
      amount += this.freightCalculator.calculate(item) * inputItem.quantity
    }
    return new SimulateFreightOutput(amount)
  }
}
