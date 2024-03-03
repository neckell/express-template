import DataService from "../../application/DataService.js";
import IDataService from "../../domain/application/IDataService.js";
import IDataController from "../../domain/controller/IDataController.js";

class DataController implements IDataController {
  private service: IDataService = new DataService();

  getRegimenes = async (): Promise<any | undefined> => {
    return await this.service.getRegimenes();
  }
}

export default DataController;