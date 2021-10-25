/* eslint-disable import/first */
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

import passport from '@infra/http/middlewares';
import routes from '@infra/http/routes';

const app = express();
passport(app);

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-type, Accept, Authorization'
  );
  next();
});

app.use(
  morgan('dev'),
  express.json({ limit: '1000MB' }),
  express.urlencoded({ limit: '2000MB', extended: true })
);

routes(app);

app.set('port', process.env.PORT || 3000);

export default app;
