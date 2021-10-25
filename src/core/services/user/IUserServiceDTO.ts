import { Roles } from '@core/entities/User';

export type ICreateUserRequestDTO = {
  email: string;
  role: Roles;
  companyId: any;
};

export type IConfirmFirstAccesDoneDTO = {
  oldPassword: string;
  newPassword: string;
  token: string;
  name: string;
};
