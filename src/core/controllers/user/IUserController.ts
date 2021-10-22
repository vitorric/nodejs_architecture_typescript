import { ControllerResponse } from '../ControllerResponse';

export default interface IUserController<T = any> {
  create: (request: T) => Promise<ControllerResponse>;
  get: (request: T) => Promise<ControllerResponse>;
}
