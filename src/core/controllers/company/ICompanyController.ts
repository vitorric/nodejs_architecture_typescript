import { ControllerResponse } from '../ControllerResponse';

export default interface ICompanyController<T = any> {
  create: (request: T) => Promise<ControllerResponse>;
}
