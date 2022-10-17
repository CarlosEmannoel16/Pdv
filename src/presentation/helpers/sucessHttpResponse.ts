import { HttpResponse } from '../protocols/index'
export const sucessHttpResponse = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}
