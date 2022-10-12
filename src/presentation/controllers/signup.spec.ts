import { SignUpController } from './signup'

describe('Testanto Cadastro de Usuário', () => {
  test('Tem que da erro 400 ao não receber o => nome', () => {
    const sut = new SignUpController()
    const httpRequest = {
      password: 'senhaTeste',
      role: 'cargoTest'
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Esta faltando os parametros: name'))
  })
  test('Tem que da erro 400 ao não receber  => password', () => {
    const sut = new SignUpController()
    const httpRequest = {
      name: 'nomeTest',
      role: 'cargoTest'
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Esta faltando os parametros: password'))
  })
  test('Tem que da erro 400 ao não receber a => role', () => {
    const sut = new SignUpController()
    const httpRequest = {
      name: 'nomeTest',
      password: 'senhaTeste'
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Esta faltando os parametros: role'))
  })
})
