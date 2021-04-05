import UsersController from './controllers/UsersController'
import TokensController from './controllers/TokensController'
import auth from './middleware'
import { Router } from 'express'

const routes = Router()
const users = new UsersController()
const tokens = new TokensController()


routes.get('/tokens', tokens.getTokens)
routes.post('/token', auth, tokens.addToken)
routes.delete('/token', auth, tokens.deleteToken)

routes.post("/users", users.create)
routes.post("/user", users.getToken)
routes.delete("/user", users.delete)

export default routes
