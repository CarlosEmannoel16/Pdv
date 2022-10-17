import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { InvalidParam, MissingParamError } from '../../errors'
import { serverError, badRequest, sucessHttpResponse } from '../../helpers'
export class SignUpController implements Controller {
  private readonly emailValidador
  private readonly addAccount
  constructor (EmailValidator: EmailValidator, AddAccount: AddAccount) {
    this.emailValidador = EmailValidator
    this.addAccount = AddAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'password', 'role', 'email']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }

      const insValidEmail = this.emailValidador.isValid(httpRequest.body.email)
      if (!insValidEmail) {
        return badRequest(new InvalidParam('email'))
      }

      const { name, password, role, email } = httpRequest.body

      const account = this.addAccount.add({
        name,
        password,
        role,
        email
      })

      return sucessHttpResponse(account)
    } catch (error) {
      return serverError()
    }
  }
}
