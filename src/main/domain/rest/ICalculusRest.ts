import { UserDeterminationCalculationRequest, UserDeterminationImportRequest } from "../entities/core.js";
import { UserDeterminationImportResponseDto } from "../entities/dto.js";

export default interface ICalculusRest {
    /**
     * Executes an import for a determination calculus on Calculus system
     * @param request args object
     */
    executeDeterminationImport(request: UserDeterminationImportRequest): Promise<UserDeterminationImportResponseDto | undefined>;

    /**
     * Executes an calc for a determination calculus on Calculus system
     * @param request args object
     */
    executeDeterminationCalculus(request: UserDeterminationCalculationRequest): Promise<any | undefined>;
}