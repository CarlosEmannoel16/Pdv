import { SignUpController } from './signup'
import { MissingParamError } from '../../errors/MissingError'
import { Controller } from '../../protocols/controller'
import { EmailValidator } from '../../protocols/email-validator'
import { InvalidParam, ServerError } from '../../errors'
import { AddAccountModel, AddAccount } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'

interface SutParam {
  sut: Controller
  emailValidatorStub: EmailValidator
  AddAccountStub: AddAccount
}

const makeAddAccont = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'idValid',
        name: 'validName',
        email: 'validEmail',
        password: 'validPassword',
        role: 'validRole'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutParam => {
  class EmailValidatorStub implements EmailValidator {
    isValid (): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const AddAccountStub = makeAddAccont()
  const sut = new SignUpController(emailValidatorStub, AddAccountStub)

  return {
    sut,
    emailValidatorStub,
    AddAccountStub

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

  test('Tem que da erro 500 ao ter algum error inesperado no EmailValidate', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'nomeTest',
        password: 'senhaTeste',
        role: 'teste',
        email: 'email@testeh.br'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Tem que da erro 500 ao ter algum error inesperado no AddAccount', () => {
    const { sut, AddAccountStub } = makeSut()
    jest.spyOn(AddAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'nomeTest',
        password: 'senhaTeste',
        role: 'teste',
        email: 'email@testeh.br'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Tem que da erro 500 ao ter algum error inesperado', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'nomeTest',
        password: 'senhaTeste',
        role: 'teste',
        email: 'email@testeh.br'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Meu SignupController tem que usar Corretamente o AddAccount', () => {
    const { sut, AddAccountStub } = makeSut()
    const addSpy = jest.spyOn(AddAccountStub, 'add')

    const httpRequest = {
      body: {
        name: 'nomeTest',
        password: 'senhaTeste',
        role: 'teste',
        email: 'email@testeh.br'
      }
    }
    sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'nomeTest',
      password: 'senhaTeste',
      role: 'teste',
      email: 'email@testeh.br'
    })
  })
  test('Tem que da status 200 ao da tudo certo', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'nomeTest',
        password: 'senhaTeste',
        role: 'teste',
        email: 'email@testeh.br'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'idValid',
      name: 'validName',
      email: 'validEmail',
      password: 'validPassword',
      role: 'validRole'
    })
  })
})
