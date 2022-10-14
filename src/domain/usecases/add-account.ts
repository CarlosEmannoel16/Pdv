import { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
  role: string
}

export interface AddAccount {
  add: (addAccoutModel: AddAccountModel) => AccountModel
}
