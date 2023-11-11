import express, { Application, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/users.routes'
import AppError from '../../shared/errors/AppError'

const app: Application = express()
app.use(bodyParser.json())

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
