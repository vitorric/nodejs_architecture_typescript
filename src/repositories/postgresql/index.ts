import { Sequelize } from 'sequelize';

import config from './config';

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(config);

    this.connection.authenticate();
  }
}

const database: Database = new Database();

export default database;
