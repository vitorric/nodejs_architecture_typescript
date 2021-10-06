import { Response } from "express";
import crypto from 'crypto';

const GetMD5 = (password: string) => crypto.createHash('md5').update(password, 'utf8').digest('hex');

const ResJson = (res: Response, code: number, success: boolean, payload: any) => res.status(code).jsonp({ success, payload });

export {
    GetMD5,
    ResJson
}