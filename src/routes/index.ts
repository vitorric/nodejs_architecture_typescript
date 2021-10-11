import routeAuth from './auth';
/**
 * Padrão de rotas = token/service/metodo
 */
export default (app: any): any => {
  app.use('/api/auth', routeAuth);
  // app.use('/api/user', require('./user')());
};
