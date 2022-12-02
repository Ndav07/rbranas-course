import PlaceOrder from "../../src/application/usecases/Place-order"
import CouponRepositoryMemory from "../../src/infra/repository/memory/Coupon-repository-memory"
import ItemRepositoryMemory from "../../src/infra/repository/memory/Item-repository-memory"
import OrderRepositoryMemory from "../../src/infra/repository/memory/Order-repository-memory"

describe('Test PlaceOrder', () => {
  it('should place an order', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
    const placeOrder = new PlaceOrder(
      itemRepository, 
      orderRepository,
      couponRepository
    )
    const input = {
      cpf: '839.435-452-10',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      date: new Date('2022-12-10'),
      coupon: 'VALE20'
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(88)
  })

  it('should place an order with freight calculate without coupon', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
    const placeOrder = new PlaceOrder(
      itemRepository, 
      orderRepository,
      couponRepository
    )
    const input = {
      cpf: '839.435-452-10',
      orderItems: [
        { idItem: 4, quantity: 1 },
        { idItem: 5, quantity: 1 },
        { idItem: 6, quantity: 3 },
      ],
      date: new Date('2022-12-10')
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(6350)
  })
})