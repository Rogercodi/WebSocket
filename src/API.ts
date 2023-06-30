import express, { Application } from 'express';
import * as http from 'http';
import { IAPI } from './Types/types';
import router from './router/Router';

export class API implements IAPI {
    private app: Application;
    public http: http.Server;
    
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(router)
        this.http = http.createServer(this.app);
    };

    public async listen(port: number, host: string){
        this.http.listen(port, host, ()=> {
            console.log(`WebSocket server is running on http://${host}:${port}`)
        })
    };
}
