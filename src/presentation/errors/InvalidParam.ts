export class InvalidParam extends Error {
  constructor (field: string) {
    super(`Invalid Param: ${field} `)
    this.name = 'InvalidParam'
  }
}
