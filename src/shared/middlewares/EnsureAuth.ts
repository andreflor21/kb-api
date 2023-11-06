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
): void {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new AppError('Não Autorizado', 401)
  }

  try {
    const [, token] = authHeader.split(' ')
    const { secret } = authConfig.jwt
    const decoded = verify(token, secret)
    req.userId = (decoded as TokenPayload).userId // Adiciona o ID do usuário aos dados da solicitação
    next()
  } catch (error) {
    throw new AppError('Token expirado ou não enviado', 401)
  }
}
