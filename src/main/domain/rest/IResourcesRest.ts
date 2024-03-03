import { Regimen } from "../entities/core";

export interface IResourcesRest {
    /**
     * Executes a python script
     * @param inputFile name of the input python file
     * @param outputFile name of the output python file
     * @param params args object
     */
    executePython(inputFile: string, outputFile: string, params: object): Promise<boolean>;

    getRegimenes(): Promise<Regimen[]>;
}