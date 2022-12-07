import FreightCalculator from "../../../domain/entity/Freight-calculator";
import ItemRepository from "../../../domain/repository/Item-repository";
import SimulateFreightInput from "./Simulate-freight-input";
import SimulateFreightOutput from "./Simulate-freight-output";

export default class SimulateFreight {
  constructor(
    readonly itemRepository: ItemRepository, 
    readonly freightCalculator: FreightCalculator
  ) {}

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
