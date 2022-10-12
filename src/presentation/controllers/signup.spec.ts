import { SignUpController } from './signup'

describe('Testanto Cadastro de Usuário', () => {
  test('Tem que da erro 400 ao não receber o => nome', () => {
    const sut = new SignUpController()
    const httpRequest = {
      nome: 'nomeTest',
      senha: 'senhaTeste',
      cargo: 'cargoTest'
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Esta faltando oa parametros: name'))
  })
})
