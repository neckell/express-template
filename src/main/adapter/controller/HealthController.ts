import axios from "axios";

class HealthController {
  getHealth = async () => {
    const basepath = process.env.API_CALCULUS_BASEPATH as string;
    const response = (await axios.get(basepath + '/', {
      headers: {
        'Content-Type': 'application/json'
      }
    })).data as any;
    return { message: 'OK', services: response?.status }
  };

  postHealth = (message: string): object => { return { message: message }; }
}

export default HealthController;