import routeAuth from './auth';

export default (app: any): any => {
  app.use('/api/auth', routeAuth);
  // app.use('/api/user', require('./user')());
};
