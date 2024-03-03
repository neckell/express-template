import axios from 'axios';
import { spawn } from 'child_process';
import { Regimen } from '../../domain/entities/core';
import { IResourcesRest } from '../../domain/rest/IResourcesRest';
import { transformPythonResponse } from '../../utils/rest-utils.js';


class ResourcesRest implements IResourcesRest {
    executePython = async (inputFile: string, outputFile: string, params: object) => {
        return await new Promise((resolve, reject) => {
            const script = spawn('python', [inputFile, outputFile, JSON.stringify(params)]);

            script.stdout.on('data', (data: any) => {
                console.log(`stdout: ${data}`);
            });

            script.stderr.on('data', (data: any) => {
                console.error(`stderr: ${data}`);
                reject(false)
            });

            script.on('close', (code: any) => {
                console.log(`child process exited with code ${code}`);
                resolve(true)
            });

            setTimeout(() => {
                script.kill()
                console.log('python timeout')
                reject(false)
            }, 60000)
        }) as boolean
    }

    getRegimenes = async (): Promise<Regimen[]> => {
        const basepath = process.env.API_CALCULUS_BASEPATH as string;
        const response = (await axios.get<Regimen[]>(basepath + '/api/regimenes')).data;
        return transformPythonResponse(response) as Regimen[]
    }
}

export default ResourcesRest;