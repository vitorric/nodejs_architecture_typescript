import { Router } from 'express';

import CompanyController from '@core/controllers/company/CompanyController';

import { resJson } from '../../utils';

const router = Router();
const companyController = new CompanyController();

router.post('/company/create', async (request, response) =>
  resJson(response, await companyController.create({ ...request }))
);

export default router;
