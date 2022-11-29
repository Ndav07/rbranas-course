const FACTOR_DIGIR_1 = 10
const FACTOR_DIGIR_2 = 11

function clean(cpf: string): string {
  return cpf.replace(/[\.\-]*/g, '')
}

function isValidLength(cpf: string): boolean {
  return cpf.length === 11
}

function isBlocked(cpf: string){
  const [firstDigit] = cpf
  return [...cpf].every(digit => digit === firstDigit)
}

function calculateDigit(cpf: string, factor: number): number {
  let total = 0
  for(const digit of cpf) {
    if(factor > 1) total += parseInt(digit) * factor--
  }
  const rest = total % 11
  return (rest < 2) ? 0 : 11 - rest
}

function extractAtualDigit(cpf: string): string {
  return cpf.slice(9)
}

export default function validate(rawCpf: string): boolean {
  if(!rawCpf) return false
  const cpf = clean(rawCpf)
  if(!isValidLength(cpf)) return false
  if(isBlocked(cpf)) return false
  const digit1 = calculateDigit(cpf, FACTOR_DIGIR_1)
  const digit2 = calculateDigit(cpf, FACTOR_DIGIR_2)
  const actualDigit = extractAtualDigit(cpf)
  const calcDigit = `${digit1}${digit2}`
  return actualDigit === calcDigit
}
