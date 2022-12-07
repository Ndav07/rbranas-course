import SimulateFreight from "../../src/application/usecases/simulate-freight/Simulate-freight"
import DefaultFreightCalculator from "../../src/domain/entity/Default-freight-calculator"
import PgPromiseConnectionAdpter from "../../src/infra/database/Pg-promise-connection-adpter"
import ItemRepositoryDatabase from "../../src/infra/repository/database/Item-repository-database"

describe('Test simulate freight', () => {
  it('should freight simulate of the items', async () => {
    const connection = PgPromiseConnectionAdpter.getInstance()
    const itemRepository = new ItemRepositoryDatabase(connection)
    const freightCalculator = new DefaultFreightCalculator()
    const simulateFreight = new SimulateFreight(itemRepository, freightCalculator)
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
