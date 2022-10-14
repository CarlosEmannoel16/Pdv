import { HttpRequest, HttpResponse, EmailValidator, Controller } from '../protocols'

import { InvalidParam, MissingParamError } from '../errors'
import { serverError, badRequest } from '../helpers'
export class SignUpController implements Controller {
  private readonly emailValidador
  constructor (EmailValidator: EmailValidator) {
    this.emailValidador = EmailValidator
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

      return {
        statusCode: 200,
        body: ''

      }
    } catch (error) {
      return serverError()
    }
  }
}
