import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest } from '../helpers/badRequest'
import { MissingParamError } from '../errors/MissingError'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParam } from '../errors/InvalidParam'
export class SignUpController implements Controller {
  private readonly emailValidador
  constructor (EmailValidator: EmailValidator) {
    this.emailValidador = EmailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'password', 'role', 'email']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }

    const insValidEmail = this.emailValidador.isValid(httpRequest.body.email)
    if (!insValidEmail) {
      return badRequest(new InvalidParam('email'))
    }
    return {
      statusCode: 400,
      body: {
        password: 'senhaTeste',
        role: 'cargoTest',
        email: 'teste@email.com'
      }

    }
  }
}
