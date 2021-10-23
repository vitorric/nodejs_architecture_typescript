/* eslint-disable import/first */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

import '../src/infra/db/mongodb/connection';
import { CompanySeed } from './company';

async function executeSeed() {
  await CompanySeed();
}

executeSeed();
