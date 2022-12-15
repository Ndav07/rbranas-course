export default class ValidateCPF {
  value: string

  constructor(value: string) {
    if(!this.validate(value)) throw new Error('Invalid CPF')
    this.value = value
  }
  
  private validate(rawCpf: string): boolean {
    const FACTOR_DIGIR_1 = 10
    const FACTOR_DIGIR_2 = 11
    if(!rawCpf) return false
    const cpf = this.clean(rawCpf)
    if(!this.isValidLength(cpf)) return false
    if(this.isBlocked(cpf)) return false
    const digit1 = this.calculateDigit(cpf, FACTOR_DIGIR_1)
    const digit2 = this.calculateDigit(cpf, FACTOR_DIGIR_2)
    const actualDigit = this.extractAtualDigit(cpf)
    const calcDigit = `${digit1}${digit2}`
    return actualDigit === calcDigit
  }

  private clean(cpf: string): string {
    return cpf.replace(/[\.\-]*/g, '')
  }

  private isValidLength(cpf: string): boolean {
    return cpf.length === 11
  }

  private isBlocked(cpf: string): boolean {
    const [firstDigit] = cpf 
    return [...cpf].every(digit => digit === firstDigit)
  }

  private calculateDigit(cpf: string, factor: number): number {
    let total = 0
    for(const digit of cpf) {
      if(factor > 1) total += parseInt(digit) * factor--
    }
    const rest = total % 11
    return (rest < 2) ? 0 : 11 - rest
  }

  private extractAtualDigit(cpf: string): string {
    return cpf.slice(9)
  }
}
