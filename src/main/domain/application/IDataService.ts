import { Regimen } from "../entities/core.js";

export default interface IDataService {
    /**
     * Executes a get Regimenes
     */
    getRegimenes(): Promise<Regimen[]>;
}