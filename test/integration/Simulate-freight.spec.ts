import SimulateFreight from "../../src/application/usecases/simulate-freight/Simulate-freight"
import PgPromiseConnectionAdpter from "../../src/infra/database/Pg-promise-connection-adpter"
import ItemRepositoryDatabase from "../../src/infra/repository/database/Item-repository-database"

describe('Test simulate freight', () => {
  it('should freight simulate of the items', async () => {
    const connection = new PgPromiseConnectionAdpter()
    const itemRepository = new ItemRepositoryDatabase(connection)
    const simulateFreight = new SimulateFreight(itemRepository)
    const input = [
      {
        idItem: 4,
        quantity: 1
      },
      {
        idItem: 5,
        quantity: 1
      },
      {
        idItem: 6,
        quantity: 3
      }
    ]
    const output = await simulateFreight.execute(input)
    expect(output.amount).toBe(260)
  })
})
