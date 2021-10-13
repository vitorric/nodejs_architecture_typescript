export type ServiceResponse = any;

export function serviceResponse<T>(dto?: T): ServiceResponse {
  return { ...dto };
}
