import { Response } from 'express';

export type ControllerResponse = {
  statusCode: number;
  payload: any;
  success: boolean;
};

const resJson = (
  response: Response,
  controllerResponse: ControllerResponse
): any =>
  response.status(controllerResponse.statusCode).jsonp({
    success: controllerResponse.success,
    payload: controllerResponse.payload,
  });

export { resJson };
