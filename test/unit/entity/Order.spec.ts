import Order from '../../../src/domain/entity/order/Order'
import Item from '../../../src/domain/entity/Item'
import Coupon from '../../../src/domain/entity/Coupon'
import DefaultFreightCalculator from '../../../src/domain/entity/Default-freight-calculator'
import FixedFreightCalculator from '../../../src/domain/entity/Fixed-freight-calculator'

describe('Test Order', () => {
  
  it('should create a empty order with CPF valid', () => {
    const cpf = '839.435.452-10'
    const order = new Order(cpf)
    const total = order.getTotal()
    expect(total).toBe(0)
  })

  it('should create a empty order with CPF invalid', () => {
    const cpf = '111.111.111-11'
    expect(() => new Order(cpf)).toThrow(new Error('Invalid CPF'))
  })

  it('should create a order with 3 items', () => {
    const cpf = '839.435.452-10'
    const order = new Order(cpf)
    order.addItem(new Item(1, 'Music', 'CD', 30), 3)
    order.addItem(new Item(2, 'Video', 'DVD', 50), 1)
    order.addItem(new Item(3, 'Video', 'VHS', 10), 2)
    const total = order.getTotal()
    expect(total).toBe(160)
  })

  it('should create a order with 3 items and discount coupon', () => {
    const cpf = '839.435.452-10'
    const order = new Order(cpf)
    order.addItem(new Item(1, 'Music', 'CD', 30), 3)
    order.addItem(new Item(2, 'Video', 'DVD', 50), 1)
    order.addItem(new Item(3, 'Video', 'VHS', 10), 2)
    order.addCoupon(new Coupon('VALE20', 20))
    const total = order.getTotal()
    expect(total).toBe(128)
  })

  
  it('should create a order with 3 items and a discount coupon expired', () => {
    const cpf = '839.435.452-10'
    const order = new Order(cpf, new Date('2022-12-10'))
    order.addItem(new Item(1, 'Music', 'CD', 30), 3)
    order.addItem(new Item(2, 'Video', 'DVD', 50), 1)
    order.addItem(new Item(3, 'Video', 'VHS', 10), 2)
    order.addCoupon(new Coupon('VALE20', 20, new Date('2022-12-01')))
    const total = order.getTotal()
    expect(total).toBe(160)
  })

  it('should create a order with 3 items and a freight calculation with the strategy default', () => {
    const cpf = '839.435.452-10'
    const order = new Order(cpf, new Date(), new DefaultFreightCalculator())
    order.addItem(new Item(4, 'Musical Instruments', 'Guitar', 1000, 100, 30, 10, 3), 1)
    order.addItem(new Item(5, 'Musical Instruments', 'Amplifier', 5000, 100, 50, 50, 20), 1)
    order.addItem(new Item(6, 'Accessories', 'Cable', 30, 10, 10, 10, 0.9), 3)
    const freight = order.getFreight()
    expect(freight).toBe(260)
  })

  it('should create a order with 3 items and a freight calculation with the strategy fix', () => {
    const cpf = '839.435.452-10'
    const order = new Order(cpf, new Date(), new FixedFreightCalculator())
    order.addItem(new Item(4, 'Musical Instruments', 'Guitar', 1000, 100, 30, 10, 3), 1)
    order.addItem(new Item(5, 'Musical Instruments', 'Amplifier', 5000, 100, 50, 50, 20), 1)
    order.addItem(new Item(6, 'Accessories', 'Cable', 30, 10, 10, 10, 0.9), 3)
    const freight = order.getFreight()
    expect(freight).toBe(50)
  })

  it('should create a order with code', () => {
    const cpf = '839.435.452-10'
    const order = new Order(cpf, new Date('2022-10-14'), new FixedFreightCalculator())
    order.addItem(new Item(4, 'Musical Instruments', 'Guitar', 1000, 100, 30, 10, 3), 1)
    order.addItem(new Item(5, 'Musical Instruments', 'Amplifier', 5000, 100, 50, 50, 20), 1)
    order.addItem(new Item(6, 'Accessories', 'Cable', 30, 10, 10, 10, 0.9), 3)
    const code =  order.getCode()
    expect(code).toBe('202200000001')
  })
})
