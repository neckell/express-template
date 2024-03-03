import { Router, Request, Response } from 'express';
import multer from 'multer';
import DeterminationController from '../../adapter/controller/DeterminationController.js';
import IDeterminationController from '../../domain/controller/IDeterminationController.js';
import { isNullOrEmpty } from '../../utils/valitations/validations.js';

const controller: IDeterminationController = new DeterminationController();
const router: Router = Router()

const upload = multer();

router
  .post('/upload', upload.fields([{ name: 'historia_laboral', maxCount: 1 }, { name: 'sicam', maxCount: 1 }]), async (req: Request, res: Response) => {
    const response = await controller.upload(req);
    res.status(isNullOrEmpty(response) ? 400 : 200).json(response);
  })

router
  .post('/calculate', async (req: Request, res: Response) => {
    const response = await controller.calculate(req);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=aineed_${req.body.apellido.replaceAll(' ', '_')}_${req.body.cuit}.pdf`);
    res.status(response ? 200 : 400).json(response);
  })

export default router