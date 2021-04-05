import { Document, connect, model } from 'mongoose'
import TokensSchema from './Tokens'
import UsersSchema from './Users'
import env from '../env'

interface ITokens extends Document{
  token: string;
}

interface IUsers extends Document {
  password: string;
  username: string;
}


connect(env.MONGO_DB, {
  useNewUrlParser: true, useUnifiedTopology: true,
  useFindAndModify: false
})

export const tokens = model<ITokens>("tokens", TokensSchema)
export const users = model<IUsers>("users_api", UsersSchema)
