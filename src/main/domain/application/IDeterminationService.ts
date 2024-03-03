import { UserDeterminationCalculationRequest, UserDeterminationImport, UserDeterminationImportRequest } from "../entities/core.js";

export default interface ICalculationService {
    /**
     * Executes an import for a determination request on Calculus system
     */
    importDeterminationData(params: UserDeterminationImportRequest): Promise<UserDeterminationImport | undefined>;

    /**
     * Executes an calculus for a determination request on Calculus system
     */
    calculateDetermination(params: UserDeterminationCalculationRequest): Promise<any>;
}