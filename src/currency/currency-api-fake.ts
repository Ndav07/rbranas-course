import CurrencyAPI from "./currency-api";

export default class CurrencyAPIFake implements CurrencyAPI {
  convert(amount: number, currency: string): number {
    if(currency === 'USD'){
      amount = amount * 5
    }
    return amount
  }
}
