import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest } from '../helpers/badRequest'
import { MissingParamError } from '../errors/MissingError'
import { Controller } from '../protocols/controller'
export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'password', 'role']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }
    return {
      statusCode: 200,
      body: ' ok'
    }
  }
}
