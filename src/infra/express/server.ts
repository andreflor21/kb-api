import express, { Application, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/users.routes'
import AppError from '../../shared/errors/AppError'
import {rateLimit} from 'express-rate-limit' 

const app: Application = express()
app.use(bodyParser.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
}) 

app.use(limiter)
app.use('/', userRoutes)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
