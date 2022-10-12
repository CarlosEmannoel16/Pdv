import { SignUpController } from './signup'
import { MissingParamError } from '../errors/MissingError'

describe('Testanto Cadastro de Usuário', () => {
  test('Tem que da erro 400 ao não receber o => nome', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        password: 'senhaTeste',
        role: 'cargoTest'
      }

    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Tem que da erro 400 ao não receber  => password', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'nomeTest',
        role: 'cargoTest'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Tem que da erro 400 ao não receber a => role', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'nomeTest',
        password: 'senhaTeste'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('role'))
  })
})
