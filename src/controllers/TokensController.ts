import { Request, Response } from 'express'
import { tokens } from '../database'


export default class TokensController {

  async getTokens(_req: Request, res: Response) {
    const getAllTokens = await tokens.find()

    if (getAllTokens) {

      const currentTokens = []

      for (const token of getAllTokens) {
        currentTokens.push(token.token)
      }

      res.status(200)
        .json({tokens: currentTokens, total: currentTokens.length})
    }

    else
      res.status(400).json({error: "Nenhum token registrado"})
  }

  async addToken(req: Request, res: Response) {
    const { token } = req.body

    const getToken = await tokens.exists({ token })

    if(!getToken) {
      await tokens.create({ token })
      res.status(201).json({info: "Token adicionado"})

    }

    else
      res.status(404).json({error: "Token já adicionando no banco"})

  }

  async deleteToken(req: Request, res: Response) {
    const { token } = req.body
    const getToken = tokens.exists({ token })

    if(getToken) {
      await tokens.findOneAndDelete({ token })
      res.status(200).json({info: "Token deletado"})

    }

    else
      res.status(404).json({error: "Token não existe no banco de dados"})

  }
}
