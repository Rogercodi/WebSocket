export interface IEnvVar {
    port: number;
    frontDir: string;
    fileDir: string;
}

export interface IGetConfiguration {
    getEnvVar(): IEnvVar
}