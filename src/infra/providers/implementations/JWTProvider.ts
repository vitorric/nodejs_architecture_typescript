import JWT from 'jsonwebtoken';

import { IJWTProvider } from '../IJWTProvider';

export default class JWTProvider implements IJWTProvider {
  create(user: any, minutes: number): string {
    try {
      return JWT.sign(
        {
          auth: user,
          exp: Math.floor(Date.now() / 1000) + 60 * minutes,
        },
        process.env.JWT_SECRET
      );
    } catch (error) {
      console.log('createToken', error);
      throw new Error('Failed create token');
    }
  }

  decode(token: string): any {
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      console.log('decode', error);
      throw new Error('Failed decode token');
    }
  }
}
