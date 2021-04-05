import { Schema } from 'mongoose'

const TokenSchema = new Schema({
  token: {
    type: String,
    unique: true,
    required: true
  }
})

export default TokenSchema
