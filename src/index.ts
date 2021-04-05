import express from 'express'
import routes from './routers'


const app = express()

app.use(express.json())
app.use(routes)

app.get("/", (_, res) => res.send("Enfeite...KEK"))

app.listen(8080, () => {
  console.log("Servidor rodando...")
})
