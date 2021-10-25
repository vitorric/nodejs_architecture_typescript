import passport from 'passport';

import userPassport from './user';

export default (app: any): void => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  userPassport();

  app.use(passport.initialize());
};
