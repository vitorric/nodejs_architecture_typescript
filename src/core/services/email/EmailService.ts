import { IMailProvider } from '@infra/providers/IMailProvider';

import {
  ControllerResponse,
  created,
} from '../../controllers/ControllerResponse';
import {
  IEmailServiceDTO,
  IEmailConfirmCompanyUserDTO,
} from './IEmailServiceDTO';

export class EmailService {
  private defaultName = 'Fintech';

  private defaultEmail = 'fintech@fintech.com';

  constructor(private mailProvider: IMailProvider) {}

  async send(data: IEmailServiceDTO): Promise<ControllerResponse> {
    await this.mailProvider.sendMail({
      to: {
        email: data.to.email,
        name: data.to.name,
      },
      from: {
        email: data.from.email,
        name: data.from.name,
      },
      subject: data.subject,
      body: data.body,
    });

    return created();
  }

  async sendEmailConfirmCompanyUser(
    data: IEmailConfirmCompanyUserDTO
  ): Promise<ControllerResponse> {
    await this.mailProvider.sendMail({
      to: {
        email: data.to.email,
        name: data.to.name,
      },
      from: {
        email: this.defaultEmail,
        name: this.defaultName,
      },
      subject: 'Bem vindo(a) a plataforma Fintech',
      body: `<p>Para começar a usar a plataforma, <a href="${data.confirmLink}">clique aqui</a> e configure o seu cadastro.</p>`,
    });

    return created();
  }
}
