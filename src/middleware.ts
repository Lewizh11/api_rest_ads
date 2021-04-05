import env from './env'
import { users } from './database'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default async (req: Request, res: Response , next: NextFunction) => {

  const authToken = req.headers['authorization'];

  if(authToken != undefined){
    const token = authToken.split(' ')[1]

    try {

      const decoded = jwt.verify(token, env.PASS);
      //@ts-ignore
      if(await users.exists({username: decoded.username })){
        next()

      }else{
        res.status(403).json({err: "Você não possui poder para isto!"})
        return
      }
    } catch (error) {
      res.status(403).json({err: "Você não está autenticado"})
      return
    }

  } else {
    res.status(403).json({err: "Você não está autenticado"})
    return
  }

}
