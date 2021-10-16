import crypto from 'crypto';

const GetMD5 = (password: string): string =>
  crypto.createHash('md5').update(password, 'utf8').digest('hex');

export { GetMD5 };
