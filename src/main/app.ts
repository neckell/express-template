import express, { Express } from 'express';
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import configRoutes from './routing/router.js'

const app: Express = express();

const configMiddlewares = (app: Express) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(logger('dev'))
  app.use(cors())
}

const configApp = () => {
  configMiddlewares(app)
  configRoutes(app)
}

configApp()

export default app
