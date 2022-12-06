import PlaceOrder from "../../src/application/usecases/place-order/Place-order"
import CouponRepository from "../../src/domain/repository/Coupon-repository"
import ItemRepository from "../../src/domain/repository/Item-repository"
import OrderRepository from "../../src/domain/repository/Order-repository"
import Connection from "../../src/infra/database/Connection"
import PgPromiseConnectionAdpter from "../../src/infra/database/Pg-promise-connection-adpter"
import CouponRepositoryDatabase from "../../src/infra/repository/database/Coupon-repository-database"
import OrderRepositoryDatabase from "../../src/infra/repository/database/Order-repository-database"
import ItemRepositoryDatabase from "../../src/infra/repository/database/Item-repository-database"

import CouponRepositoryMemory from "../../src/infra/repository/memory/Coupon-repository-memory"
import OrderRepositoryMemory from "../../src/infra/repository/memory/Order-repository-memory"
import ItemRepositoryMemory from "../../src/infra/repository/memory/Item-repository-memory"

describe('Test PlaceOrder', () => {
  let itemRepository: ItemRepository
  let couponRepository: CouponRepository
  let orderRepository: OrderRepository
  let placeOrder: PlaceOrder
  let connection: Connection

  beforeEach(() => {
    connection = new PgPromiseConnectionAdpter()
    itemRepository = new ItemRepositoryDatabase(connection)
    couponRepository = new CouponRepositoryDatabase(connection)
    orderRepository = new OrderRepositoryDatabase(connection)
    placeOrder = new PlaceOrder(
      itemRepository, 
      orderRepository,
      couponRepository
    )
  })

  afterEach(async () => {
    await orderRepository.clear()
  })

  it('should place an order', async () => {
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
    expect(output.total).toBe(138)
  })

  it('should place an order with freight calculate without coupon', async () => {
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

  it('should place an order with code', async () => {
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
    expect(output.code).toBe('202200000001')
  })
})