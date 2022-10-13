import { SignUpController } from './signup'
import { MissingParamError } from '../errors/MissingError'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParam } from '../errors/InvalidParam'

interface SutParam {
  sut: Controller
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutParam => {
  class EmailValidatorStub implements EmailValidator {
    isValid (): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub

  }
}

describe('Testanto Cadastro de Usuário', () => {
  test('Tem que da erro 400 ao não receber o => nome', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'senhaTeste',
        role: 'cargoTest',
        email: 'teste@email.com'
      }

    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Tem que da erro 400 ao não receber  => password', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'nomeTest',
        role: 'cargoTest',
        email: 'teste@email.com'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Tem que da erro 400 ao não receber a => role', () => {
    const { sut } = makeSut()
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
  test('Tem que da erro 400 ao não receber a => email', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'nomeTest',
        password: 'senhaTeste',
        role: 'teste'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Tem que da erro 400 ao enviar email Inválido', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'nomeTest',
        password: 'senhaTeste',
        role: 'teste',
        email: 'email@testeh.br'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParam('email'))
  })
})
