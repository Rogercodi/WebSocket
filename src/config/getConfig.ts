import { IEnvVar, IGetConfiguration } from "./configTypes";
require('dotenv').config();

export class getConfiguration implements IGetConfiguration {
    constructor (){};

    public getEnvVar (): IEnvVar{
        let envVar = {
            port: parseInt(<string>process.env.PORT),
            frontDir: <string>process.env.PUBLIC_DIR,
            fileDir: <string>process.env.SIMFILE_DIR
        }
        return envVar
    }
}