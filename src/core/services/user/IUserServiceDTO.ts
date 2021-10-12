import { Roles } from '@core/entities/User';

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  role: Roles;
}
