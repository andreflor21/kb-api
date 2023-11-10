import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/AuthConfig'
import AppError from '../errors/AppError'

interface TokenPayload {
  iat: number
  exp: string | number
  sub: string | number
  userId: string
  profileId: string
}

export default function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Não Autorizado' })
  }

  try {
    const [, token] = authHeader.split(' ')
    const { secret } = authConfig.jwt

    const decoded = verify(token, secret)
    req.userId = (decoded as TokenPayload).userId // Adiciona o ID do usuário aos dados da solicitação
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token expirado ou não enviado' })
  }
}
