import { Roles } from '@core/entities/User';

export type ICreateUserRequestDTO = {
  name: string;
  email: string;
  password: string;
  role: Roles;
};
