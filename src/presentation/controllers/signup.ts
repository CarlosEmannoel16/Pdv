export class SignUpController {
  handle (http: any): any {
    if (!http.name) {
      return {
        statusCode: 400,
        body: new Error('Esta faltando oa parametros: name')
      }
    }
  }
}
