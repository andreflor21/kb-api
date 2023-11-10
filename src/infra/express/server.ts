import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/users.routes'

const app: Application = express()
app.use(bodyParser.json())

app.use('/', userRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
