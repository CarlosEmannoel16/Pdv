import { ServerError } from '../errors/ServerError'
import { HttpResponse } from '../protocols'

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
