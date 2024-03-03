import { Express } from 'express';
import createError from 'http-errors'
import HealthRouter from './routers/HealthRouter.js';
import determinationRouter from './routers/DeterminationRouter.js';
import dataRouter from './routers/DataRouter.js';
const API_V1 = "/api/v1";

enum Routes {
  base = '/',
  determination = '/determination',
  data = '/data'
}

const configRoutes = (app: Express) => {
  app.use(Routes.base, HealthRouter)
  app.use(API_V1 + Routes.determination, determinationRouter)
  app.use(API_V1 + Routes.data, dataRouter)

  // catch 404 and forward to error handler
  app.use(function (req: any, res: any, next) {
    next(createError(404))
  })

  // error handler
  app.use(function (err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err?.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err?.status || 500)
    res.send(err)
  })
}

export default configRoutes
