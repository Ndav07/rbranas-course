export default class OrderCode {
  readonly value: string

  constructor(date: Date, sequence: number) {
    this.value = this.generateCode(date, sequence)
  }
  
  private generateCode(date: Date, sequence: number): string {
    const year = date.getFullYear()
    return `${year}${sequence.toString().padStart(8, '0')}`
  }
}
