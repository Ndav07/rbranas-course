import validate from './validation-cpf'

describe('Validation CPF', () => {
  it('should validate the cpf A', () => {
    const isValid = validate('935.411.347-80')
    expect(isValid).toBeTruthy()
  })
  
  it('should validate the cpf B', () => {
    const isValid = validate('357.188.378-05')
    expect(isValid).toBeTruthy()
  })
  
  it('should validate the cpf C', () => {
    const isValid = validate('987.654.321-00')
    expect(isValid).toBeTruthy()
  })
  
  it('should not validate the cpf D', () => {
    const isValid = validate('987.654.321-10')
    expect(isValid).toBeFalsy()
  })
  
  it('should not validate the cpf E', () => {
    const isValid = validate('987a654b321c10')
    expect(isValid).toBeFalsy()
  })
  
  it('should not validate the cpf F', () => {
    const isValid = validate('111.111.111-11')
    expect(isValid).toBeFalsy()
  })
  
  it('should not validate the cpf G', () => {
    const isValid = validate('987!654@321-00')
    expect(isValid).toBeFalsy()
  })
  
  it('should not validate the cpf H', () => {
    const isValid = validate('987654321000')
    expect(isValid).toBeFalsy()
  })
  
  it('should not validate the cpf I', () => {
    const isValid = validate('987.654.321-000')
    expect(isValid).toBeFalsy()
  })
})
