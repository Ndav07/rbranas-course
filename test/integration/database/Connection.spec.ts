import PgPromiseConnectionAdpter from "../../../src/infra/database/Pg-promise-connection-adpter"

describe('Test connection data base', () => {
  it('should create a connection with data base', async () => {
    const connection = PgPromiseConnectionAdpter.getInstance()
    const itemsDate = await connection.query('select * from ccca.item', [])
    expect(itemsDate).toHaveLength(6)
  })
})
