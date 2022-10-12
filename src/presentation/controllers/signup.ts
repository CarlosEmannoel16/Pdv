export class SignUpController {
  handle (http: any): any {
    if (!http.name) {
      return {
        statusCode: 400,
        body: new Error('Esta faltando os parametros: name')
      }
    }
    if (!http.password) {
      return {
        statusCode: 400,
        body: new Error('Esta faltando os parametros: password')
      }
    }
    if (!http.role) {
      return {
        statusCode: 400,
        body: new Error('Esta faltando os parametros: role')
      }
    }
  }
}
