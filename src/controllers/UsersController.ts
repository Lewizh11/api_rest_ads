import env from '../env'
import { users } from '../database'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class UsersController {

  async create(req: Request, res: Response) {
    const { auth, password, username } = req.body

    if (auth === env.PASS) {

      if (!password || !username) 
				return res.status(400).json({ error: "Campo de email ou senha não foi preenchido" })

      const salt = bcrypt.genSaltSync(5)
      const passHash = bcrypt.hashSync(password, salt)

      try {
        await users.create({ username, password: passHash })
        return res.status(201).json({ info: "Usuário criado com sucesso" })
      
			} catch {
        return res.status(500).json({ error: "Ocorreu um erro ao criar o usuário" })
      }

    }

		res.status(401).json({ error: "Você não tem autorização!" })
  
  }

  async getToken(req: Request, res: Response) {
    const { password, username } = req.body

    if (!password || !username)
      return res.status(400).json({ error: "Campo de usuário ou senha não foi preenchido" })
    
    const getUser = await users.findOne({ username })
    
		if (getUser) {

      const correct = bcrypt.compareSync( password, getUser.password)

      if (correct) {
        const token = jwt.sign({ username }, env.PASS)
        return res.status(200).json({ token: `Bearer ${token}` })
      }

      return res.status(401).json({ error: "Senha inválida" })
    }

		res.status(400).json({ error: "Usuário não registrado" })
  }

  async delete(req: Request, res: Response) {
    const { auth, username } = req.body
		
		if (!auth || !username) 
				return res.status(400).json({ error: "Campo de auth ou username não foi preenchido" })

    if(auth === env.PASS) {

      if(await users.exists({ username })) {
        await users.findOneAndDelete({ username })
        return res.status(200).json({ info: "Usuário deletado" })
      }

      return res.status(404).json({ error: "Usuário não existe" })
    }

    return res.status(401).json({ error: "Você não tem autorização!" })

  }
}
