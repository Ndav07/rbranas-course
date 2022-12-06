import ItemRepository from "../../../domain/repository/Item-repository";
import SimulateFreightInput from "./Simulate-freight-input";
import SimulateFreightOutput from "./Simulate-freight-output";

export default class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository) {}

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    let amount = 0
    return new SimulateFreightOutput(amount)
  }
}