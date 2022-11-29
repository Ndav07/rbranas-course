import Account from './account'

describe('Test Account', () => {
  it('should create account', () => {
    const account = new Account()
    const balance = account.getBalance()
    expect(balance).toBe(0)
  })
})