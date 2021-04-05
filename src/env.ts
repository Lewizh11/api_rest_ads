import dotenv from 'dotenv'
import { cleanEnv, str } from 'envalid'

dotenv.config()

export default cleanEnv(process.env, {
  MONGO_DB: str(),
  PASS: str()
})
