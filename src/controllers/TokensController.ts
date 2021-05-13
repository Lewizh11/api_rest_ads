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

      return res.status(200)
        .json({tokens: currentTokens, total: currentTokens.length})
    }
		
		res.status(400).json({error: "Nenhum token registrado"})
  }

  async addToken(req: Request, res: Response) {
    const token = req.body.token

		if(!token)
			return res.status(400).json({error: "Você deve informar o TOKEN!"})

    const getToken = await tokens.exists({ token })

    if(!getToken) {
      await tokens.create({ token })
      return res.status(201).json({info: "Token adicionado"})

    }

    res.status(404).json({error: "Token já adicionando no banco"})

  }

  async deleteToken(req: Request, res: Response) {
    const token = req.body.token 

		if(!token)
			return res.status(400).json({info: "Você deve informar o TOKEN!"})

    const getToken = tokens.exists({ token })

    if(getToken) {
      await tokens.findOneAndDelete({ token })
      return res.status(200).json({info: "Token deletado"})
    }

		res.status(404).json({error: "Token não existe no banco de dados"})

  }
}
