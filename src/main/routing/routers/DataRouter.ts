import { Router, Request, Response } from 'express';
import IDataController from '../../domain/controller/IDataController.js';
import DataController from '../../adapter/controller/DataController.js';
import { isNullOrEmpty } from '../../utils/valitations/validations.js';
const controller: IDataController = new DataController();
const dataRouter: Router = Router()

dataRouter.get('/regimenes', async (req: Request, res: Response) => {
    const response = await controller.getRegimenes()
    res.status(isNullOrEmpty(response) ? 400 : 200).json(response);
})

export default dataRouter