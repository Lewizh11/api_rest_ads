import env from '../env'
import { users } from '../database'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class UsersController {

  async create(req: Request, res: Response) {
    const { auth, password, username } = req.body

    if (auth === env.PASS) {

      if (!password || !username) {
        res.status(400).json({ error: "Campo de email ou senha não foi preenchido" })
        return
      }

      const salt = bcrypt.genSaltSync(5)
      const passHash = bcrypt.hashSync(password, salt)

      try {
        await users.create({ username, password: passHash })

        res.status(201).json({ info: "Usuário criado com sucesso" })
      } catch {
        res.status(500).json({ error: "Ocorreu um erro ao criar o usuário" })
      }
      return

    } else {
      res.status(401).json({ error: "Você não tem autorização!" })
    }
  }

  async getToken(req: Request, res: Response) {
    const { password, username } = req.body

    if (!password || !username) {
      res.status(400).json({ error: "Campo de usuário ou senha não foi preenchido" })
      return
    }

    const getUser = await users.findOne({ username })
    if (getUser) {
      //@ts-ignore
      const correct = bcrypt.compareSync( password, getUser.password)

      if (correct) {
        const token = jwt.sign({ username }, env.PASS)
        res.status(200).json({ token: `Bearer ${token}` })
        return
      }
      res.status(401).json({ error: "Senha inválida" })
      return
    } else {
      res.status(400).json({ error: "Usuário não registrado" })
      return
    }
  }

  async delete(req: Request, res: Response) {
    const { auth, username } = req.body

    if(auth === env.PASS) {

      if(await users.exists({ username })) {
        await users.findOneAndDelete({ username })
        res.status(200).json({ info: "Usuário deletado" })
        return
      }
      else
        res.status(404).json({ error: "Usuário não existe" })
    }

    else {
      res.status(401).json({ error: "Você não tem autorização!" })
      return
    }

  }
}
