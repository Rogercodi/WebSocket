import { webSocketServer } from "./WebSocket/WSS";
import { getConfiguration } from "./config/getConfig";


const {fileDir, frontDir, port} = new getConfiguration().getEnvVar();

const checkEnvVar = (fileDir: string, frontDir: string, port: number) => {
    return fileDir && frontDir && port
}

const main = async () => {
    if(!checkEnvVar(fileDir, frontDir, port)){
        throw new Error('Missing Env Variables')
    } else {
        await new webSocketServer().init(port)        
    }
};

main().catch((e) => {
    console.log(e)
})




