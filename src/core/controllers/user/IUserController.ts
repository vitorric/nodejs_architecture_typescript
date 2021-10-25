import { ControllerResponse } from '../ControllerResponse';

export default interface IUserController<T = any> {
  get: (request: T) => Promise<ControllerResponse>;
}
