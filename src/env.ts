import dotenv from 'dotenv'
import { cleanEnv, str, num } from 'envalid'

dotenv.config()

export default cleanEnv(process.env, {
  MONGO_DB: str(),
  PASS: str(),
  PORT: num()
})
