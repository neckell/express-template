import axios from "axios";
import FormData from 'form-data';
import ICalculusRest from "../../domain/rest/ICalculusRest.js";
import { UserDeterminationCalculationRequest, UserDeterminationImportRequest } from "../../domain/entities/core.js";
import { UserDeterminationImportResponseDto } from "../../domain/entities/dto.js";
import { transformPythonResponse } from "../../utils/rest-utils.js";

class CalculusRest implements ICalculusRest {
    executeDeterminationImport = async (request: UserDeterminationImportRequest): Promise<UserDeterminationImportResponseDto | undefined> => {
        const basepath = process.env.API_CALCULUS_BASEPATH as string;
        let data = new FormData();

        data.append('cuit', request.cuit ?? '');
        data.append('apellido', request.apellido ?? '');

        if (request.historia_laboral_file?.buffer)
            data.append('historia_laboral', request.historia_laboral_file?.buffer, { filename: (request.historia_laboral_file?.originalname) });
        else if (Array.isArray(request.historia_laboral))
            data.append('historia_laboral', JSON.stringify(request.historia_laboral))

        if (request.sicam_file?.buffer)
            data.append('sicam', request.sicam_file?.buffer, { filename: (request.sicam_file?.originalname) });
        else if (Array.isArray(request.sicam))
            data.append('sicam', JSON.stringify(request.sicam))

        try {
            const response = (await axios.post<any>(basepath + '/api/importacion', data)).data;
            return transformPythonResponse(response) as UserDeterminationImportResponseDto
        }
        catch (e) {
            console.log(e)
            return undefined;
        }
    }

    executeDeterminationCalculus = async (request: UserDeterminationCalculationRequest): Promise<any | undefined> => {
        const basepath = process.env.API_CALCULUS_BASEPATH as string;
        const data = JSON.stringify(request)

        try {
            const res = await axios.post<any>(basepath + '/api/calculo', data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer'
            })
            return res.data;
        }
        catch (e) {
            console.log(e)
            return undefined;
        }
    }
}

export default CalculusRest;