import routeAdmin from './admin';
import routeAuth from './auth';

export default (app: any): any => {
  app.use('/api/auth', routeAuth);
  app.use('/api/admin', routeAdmin);
};
