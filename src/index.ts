import express from 'express'
import routes from './routers'
import env from './env'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.get("/", (_, res) => res.send("Enfeite...KEK"))

app.listen(env.PORT || 8080, () => {
  console.log("Servidor rodando...")
})
