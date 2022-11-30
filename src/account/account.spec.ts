import Account from './account'
import CurrencyAPIFake from '../currency/currency-api-fake'
import CurrencyAPI from '../currency/currency-api'

describe('Test Account', () => {

  let account: Account
  let currencyAPI: CurrencyAPI

  beforeEach(() => {
    currencyAPI = new CurrencyAPIFake()
    account = new Account(currencyAPI)
  })

  it('should create account', () => {
    const balance = account.getBalance()
    expect(balance).toBe(0)
  })

  it('should make a credit of R$100,00', () => {
    account.credit(100)
    const balance = account.getBalance()
    expect(balance).toBe(100)
  })

  it('should make a debit of R$50,00', () => {
    account.credit(100)
    account.debit(50)
    const balance = account.getBalance()
    expect(balance).toBe(50)
  })

  it('should make a credit of U$100,00 com fake', () => {
    account.credit(100, 'USD')
    const balance = account.getBalance()
    expect(balance).toBe(500)
  })
})
