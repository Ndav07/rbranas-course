import SimulateFreight from "../../../src/application/usecases/simulate-freight/Simulate-freight"
import DefaultFreightCalculator from "../../../src/domain/service/freight/Default-freight-calculator"
import DatabaseRepositoryFactory from "../../../src/infra/factory/Database-repository-factory"

describe('Test simulate freight', () => {
  it('should freight simulate of the items', async () => {
    const repositoryFactory = new DatabaseRepositoryFactory()
    const freightCalculator = new DefaultFreightCalculator()
    const simulateFreight = new SimulateFreight(repositoryFactory, freightCalculator)
    const input = {
      items: [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 }
      ]
    }
    const output = await simulateFreight.execute(input)
    expect(output.amount).toBe(260)
  })
})
