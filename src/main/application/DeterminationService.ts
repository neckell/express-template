import CalculusRest from "../adapter/rest/CalculusRest.js";
import ICalculusRest from "../domain/rest/ICalculusRest.js";
import IDeterminationService from "../domain/application/IDeterminationService.js";
import { UserDeterminationCalculationRequest, UserDeterminationImport, UserDeterminationImportRequest } from "../domain/entities/core.js";
import { UserDeterminationImportResponseDto } from "../domain/entities/dto.js";
import { isNullOrEmpty } from "../utils/valitations/validations.js";
import { createFailedDetermination, createSucceedDetermination } from "../adapter/rest/mongo/repositories/determinations.js";

class DeterminationService implements IDeterminationService {
    private rest: ICalculusRest = new CalculusRest();

    importDeterminationData = async (params: UserDeterminationImportRequest): Promise<UserDeterminationImport | undefined> => {
        params.fixDatesForPython()
        const data = await this.rest.executeDeterminationImport(params) as UserDeterminationImportResponseDto
        if (isNullOrEmpty(data)) return {} as UserDeterminationImport;

        const response = new UserDeterminationImport(data);
        response.fixDatesFromPython()
        response.fixOrderHistoriaLaboral()
        return response
    }

    calculateDetermination = async (request: UserDeterminationCalculationRequest): Promise<any> => {
        request.sanitize()
        const response = await this.rest.executeDeterminationCalculus(request) as any
        if (!isNullOrEmpty(response)) {
            createSucceedDetermination(request)
        }
        else {
            createFailedDetermination(request)
        }
        return response
    }
}

export default DeterminationService;