import { Router, Request, Response } from 'express';
import HealthController from '../../adapter/controller/HealthController.js';
const controller = new HealthController();
const HealthRouter: Router = Router()

HealthRouter.get('/', async (req: Request, res: Response) => {
    res.json(await controller.getHealth()).send()
})

HealthRouter.get('/health', async (req: Request, res: Response) => {
    res.json(await controller.getHealth()).send()
})

HealthRouter.post('/health', (req: Request, res: Response) => {
    res.send(controller.postHealth(req.body.message))
})

export default HealthRouter