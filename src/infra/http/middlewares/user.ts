import passport, { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';

import User from '@core/entities/User';
import { encrypt } from '@core/utils/crypto';
import { IUserRepository } from '@infra/db/IUserRepository';
import UserRepository from '@infra/db/mongodb/implementations/userRepository';

export default (): PassportStatic => {
  passport.use(
    'user',
    new Strategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
        session: false,
      },
      async (req, email, password, done) => {
        try {
          const userRepository: IUserRepository = new UserRepository();

          // get the user given the email
          const user: User = (await userRepository.findOne({ email })) as User;

          // If not, handle it
          if (!user) {
            return done(null, false);
          }

          // Check if the password is corret
          const encryptedPassword = encrypt(password);
          const isMatch = encryptedPassword === user.password;

          // If not, handle it
          if (!isMatch || user.deleted || !user.status) {
            return done(null, false);
          }

          // Otherwise, return the cliente
          return done(null, user.toJSON());
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  return passport;
};
