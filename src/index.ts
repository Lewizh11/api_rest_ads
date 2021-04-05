import express from 'express'
import routes from './routers'
import env from './env'

const app = express()

app.use(express.json())
app.use(routes)

app.get("/", (_, res) => res.send("Enfeite...KEK"))

app.listen(env.PORT || 8080, () => {
  console.log("Servidor rodando...")
})
