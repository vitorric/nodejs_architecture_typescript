import { ControllerResponse } from '../ControllerResponse';

export default interface IUsersRepository<T = any> {
  create: (request: T) => Promise<ControllerResponse>;
  get: (request: T) => Promise<ControllerResponse>;
}
