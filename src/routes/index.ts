import routeAuth from './auth';
/**
 * Padrão de rotas = token/service/metodo
 */
export = (app: any) => {
    app.use('/api/auth', routeAuth);
    // app.use('/api/user', require('./user')());
}