import { Schema } from 'mongoose'

const UsersSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
})

export default UsersSchema
