import SimulateFreight from "../../application/usecases/simulate-freight/Simulate-freight";
import SimulateFreightOutput from "../../application/usecases/simulate-freight/Simulate-freight-output";
import FreightCalculator from "../../domain/entity/Freight-calculator";
import RepositoryFactory from "../../domain/factory/Repository-factory";

export default class SimulateFreightController {
  constructor(
    readonly repositoryFactory: RepositoryFactory, 
    readonly freightCalculator: FreightCalculator
  ) {}

  async execute(params: null, body: any): Promise<SimulateFreightOutput> {
    const freightCalculator = new SimulateFreight(this.repositoryFactory, this.freightCalculator)
    const input = body
    return await freightCalculator.execute(input)
  }
}
