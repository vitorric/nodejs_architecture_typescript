import { ControllerResponse } from '../ControllerResponse';

export default interface IUserController<T = any> {
  login: (request: T) => Promise<ControllerResponse>;
  confirmFirstAccessDone: (request: T) => Promise<ControllerResponse>;
}
