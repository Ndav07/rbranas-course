import OrderItem from "./Order-item"

describe('Test OrderItem', () => {
  it('should create a item of order', () => {
    const orderItem = new OrderItem(1, 1000, 10)
    expect(orderItem.getTotal()).toBe(10000) 
  })
})
