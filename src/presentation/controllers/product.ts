import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class ProductController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    console.log(httpRequest)

    return {
      statusCode: 200,
      body: ''
    }
  };
}
