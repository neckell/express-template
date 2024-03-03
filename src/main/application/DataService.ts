import { IResourcesRest } from "../domain/rest/IResourcesRest.js";
import ResourcesRest from "../adapter/rest/ResourcesRest.js";
import IDataService from "../domain/application/IDataService.js";
import { Regimen } from "../domain/entities/core.js";
import { capitalizeFirstLetter } from "../utils/mutators.js";

class DataService implements IDataService {
    private rest: IResourcesRest = new ResourcesRest();

    getRegimenes = async (): Promise<Regimen[]> => {
        const res = await this.rest.getRegimenes()
        return res?.filter((regimen: Regimen) => regimen.buscador === "si")
            .map((regimen: Regimen) => ({ ...regimen, nombre: capitalizeFirstLetter(regimen.nombre) }))
    }
}

export default DataService;