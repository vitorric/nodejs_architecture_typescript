import crypto from 'crypto';
import { Response } from 'express';

const GetMD5 = (password: string): string =>
  crypto.createHash('md5').update(password, 'utf8').digest('hex');

const ResJson = (
  res: Response,
  code: number,
  success: boolean,
  payload: any
): any => res.status(code).jsonp({ success, payload });

export { GetMD5, ResJson };
