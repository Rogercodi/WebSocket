import { NextFunction, Request, Response } from "express";
import { getConfiguration } from "../config/getConfig";
import path from 'path';

const fileDir = new getConfiguration().getEnvVar().frontDir;

export class getFrontendController {
    constructor(){}

    async getFrontend(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendFile(path.join(__dirname + fileDir));
        } catch (error) {
            console.log(error)
        }
    };
};