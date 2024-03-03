import { Request } from "express";
import DeterminationService from "../../application/DeterminationService.js";
import IDeterminationService from "../../domain/application/IDeterminationService.js";
import IDeterminationController from "../../domain/controller/IDeterminationController.js";
import { UserDeterminationCalculationRequest, UserDeterminationImportRequest } from "../../domain/entities/core.js";
import { isNullOrEmpty } from "../../utils/valitations/validations.js";

class DeterminationController implements IDeterminationController {
  private service: IDeterminationService = new DeterminationService();

  upload = async (req: Request): Promise<object | undefined> => {
    const files: any = req?.files
    const historia_laboral_file = files['historia_laboral'] ? files['historia_laboral'][0] : undefined
    const historia_laboral = !files['historia_laboral'] && !isNullOrEmpty(req.body.historia_laboral) ? JSON.parse(req.body.historia_laboral) : undefined
    const sicam_file = files['sicam'] ? files['sicam'][0] : undefined
    const sicam = !files['sicam'] && !isNullOrEmpty(req.body.sicam) ? JSON.parse(req.body.sicam) : undefined

    const data = new UserDeterminationImportRequest({
      cuit: !isNullOrEmpty(req.body.cuit) ? req.body.cuit : undefined,
      apellido: !isNullOrEmpty(req.body.apellido) ? req.body.apellido : undefined,
      historia_laboral: historia_laboral,
      historia_laboral_file: historia_laboral_file,
      sicam: sicam,
      sicam_file: sicam_file,
    })
    return await this.service.importDeterminationData(data);
  }

  calculate = async (req: Request): Promise<any | undefined> => {
    return await this.service.calculateDetermination(new UserDeterminationCalculationRequest(req.body));
  }
}

export default DeterminationController;