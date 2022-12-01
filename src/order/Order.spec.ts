import Order from './Order'
import Item from './Item'
import Coupon from './Coupon'

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
    order.addItem(new Item(1, 'Música', 'CD', 30), 3)
    order.addItem(new Item(2, 'Vídeo', 'DVD', 50), 1)
    order.addItem(new Item(3, 'Vídeo', 'VHS', 10), 2)
    const total = order.getTotal()
    expect(total).toBe(160)
  })

  it('should create a order with 3 items and discount coupon', () => {
    const cpf = '839.435.452-10'
    const order = new Order(cpf)
    order.addItem(new Item(1, 'Música', 'CD', 30), 3)
    order.addItem(new Item(2, 'Vídeo', 'DVD', 50), 1)
    order.addItem(new Item(3, 'Vídeo', 'VHS', 10), 2)
    order.addCoupon(new Coupon('VALE20', 20))
    const total = order.getTotal()
    expect(total).toBe(128)
  })

  
  it('should create a order with 3 items and a discount coupon expirado', () => {
    const cpf = '839.435.452-10'
    const order = new Order(cpf, new Date('2022-12-10'))
    order.addItem(new Item(1, 'Música', 'CD', 30), 3)
    order.addItem(new Item(2, 'Vídeo', 'DVD', 50), 1)
    order.addItem(new Item(3, 'Vídeo', 'VHS', 10), 2)
    order.addCoupon(new Coupon('VALE20', 20, new Date('2022-12-01')))
    const total = order.getTotal()
    expect(total).toBe(160)
  })
})
