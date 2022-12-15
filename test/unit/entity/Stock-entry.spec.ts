import StockEntry from "../../../src/domain/entity/Stock-entry"

describe('Test Stock Entry', () => {
  it('should create a stock entry', () => {
    const stockEntry = new StockEntry(1, 'in', 10, new Date('2022-07-01T10:00:00'))
    expect(stockEntry.idItem).toBe(1)
    expect(stockEntry.operation).toBe('in')
    expect(stockEntry.quantity).toBe(10)
    expect(stockEntry.date).toStrictEqual(new Date('2022-07-01T10:00:00'))
  })
})
