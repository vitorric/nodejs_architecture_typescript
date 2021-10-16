export type ControllerResponse = {
  statusCode: number;
  payload: any;
  success: boolean;
};

export function ok<T>(dto?: T): ControllerResponse {
  return {
    statusCode: 200,
    payload: dto,
    success: true,
  };
}

export function created(): ControllerResponse {
  return {
    statusCode: 201,
    payload: undefined,
    success: true,
  };
}

export function badRequest(error: Error): ControllerResponse {
  return {
    statusCode: 400,
    payload: {
      error: error.message,
    },
    success: false,
  };
}

export function unauthorized(error: Error): ControllerResponse {
  return {
    statusCode: 401,
    payload: {
      error: error.message,
    },
    success: false,
  };
}

export function forbidden(error: Error): ControllerResponse {
  return {
    statusCode: 403,
    payload: {
      error: error.message,
    },
    success: false,
  };
}

export function notFound(error: Error): ControllerResponse {
  return {
    statusCode: 404,
    payload: {
      error: error.message,
    },
    success: false,
  };
}

export function conflict(error: Error): ControllerResponse {
  return {
    statusCode: 409,
    payload: {
      error: error.message,
    },
    success: false,
  };
}

export function tooMany(error: Error): ControllerResponse {
  return {
    statusCode: 429,
    payload: {
      error: error.message,
    },
    success: false,
  };
}

export function fail(error: Error): ControllerResponse {
  console.log(error);

  return {
    statusCode: 500,
    payload: {
      error: error.message,
    },
    success: false,
  };
}
