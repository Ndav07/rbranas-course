import OrderCode from "../../../src/domain/entity/order/Order-code"

describe('Test OrderCode', () => {
  it('should create a code of order', () => {
    const date = new Date('2020-10-21')
    const sequence = 12
    const orderCode = new OrderCode(date, sequence)
    expect(orderCode.value).toBe('202000000012')
  })
})
