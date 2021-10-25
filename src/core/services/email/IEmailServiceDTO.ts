export type IEmailServiceDTO = {
  from: {
    name: string;
    email: string;
  };
  to: {
    name: string;
    email: string;
  };
  subject: string;
  body: string;
};

export type IEmailConfirmCompanyUserDTO = {
  to: {
    name: string;
    email: string;
  };
  confirmLink: string;
  tmpPassword: string;
};
