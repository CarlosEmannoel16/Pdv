export class MissingParamError extends Error {
  constructor (fieldName: string) {
    super(`Missing Para: ${fieldName}`)
    this.name = 'MissingParamError '
  }
}
