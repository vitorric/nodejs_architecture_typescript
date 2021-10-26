import { GeneratePublicKey, RandomString } from '@core/utils';
import { decrypt, encrypt } from '@core/utils/crypto';
import { ICompanyRepository } from '@infra/db/ICompanyRepository';
import { IUserRepository } from '@infra/db/IUserRepository';
import CompanyRepository from '@infra/db/mongodb/implementations/companyRepository';
import { IJWTProvider } from '@infra/providers/IJWTProvider';

import {
  ControllerResponse,
  ok,
  badRequest,
  conflict,
} from '../../controllers/ControllerResponse';
import User from '../../entities/User';
import { EmailService } from '../email/EmailService';
import {
  ICreateUserRequestDTO,
  IConfirmFirstAccesDoneDTO,
} from './IUserServiceDTO';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async create(data: ICreateUserRequestDTO): Promise<User> {
    return (await this.userRepository.create(
      new User({
        ...data,
        password: encrypt(RandomString(8)),
      })
    )) as User;
  }

  async userExists(email: string): Promise<boolean> {
    return !!(await this.userRepository.exists(email));
  }

  async login(
    user: User,
    jwt: IJWTProvider,
    companyRepository: CompanyRepository,
    emailService: EmailService
  ): Promise<ControllerResponse> {
    try {
      if (!user.firstAccessDone) {
        this.sendEmailConfirmFirstAccessDone(
          user,
          jwt,
          companyRepository,
          emailService
        );

        return conflict(
          new Error(
            'Configuração inicial necessária! Acesse o seu email e clique no link.'
          )
        );
      }

      const payload = {
        token: jwt.create(
          {
            userId: user._id,
            companyId: user.companyId,
          },
          60
        ),
      };

      return ok(payload);
    } catch (err) {
      console.log(err);
      return badRequest(new Error('Invalid Params.'));
    }
  }

  async sendEmailConfirmFirstAccessDone(
    user: User,
    jwt: IJWTProvider,
    companyRepository: CompanyRepository,
    emailService: EmailService
  ): Promise<void> {
    const company = await companyRepository.findById(user.companyId);

    const jwtConfirm = jwt.create(
      {
        companyId: user.companyId,
        userId: user.email,
      },
      10
    );

    emailService.sendEmailConfirmCompanyUser({
      to: {
        email: user.email,
        name: company.name,
      },
      confirmLink: `${process.env.URL_PORTAL}/auth/confirm/${jwtConfirm}`,
      tmpPassword: decrypt(user.password),
    });
  }

  async confirmFirstAccessDone(
    data: IConfirmFirstAccesDoneDTO,
    jwt: IJWTProvider,
    companyRepository: ICompanyRepository
  ): Promise<ControllerResponse> {
    try {
      const { auth } = jwt.decode(data.token);

      const user = await this.userRepository.findOne({
        _id: auth.userId,
        password: encrypt(data.oldPassword),
        firstAccessDone: false,
      });

      if (!user) {
        return badRequest(new Error('Invalid Params.'));
      }

      const company = await companyRepository.findById(auth.companyId);

      if (!company) {
        return badRequest(new Error('Invalid Params.'));
      }

      await this.userRepository.update(user._id, {
        ...user.toJSON(),
        password: encrypt(data.newPassword),
        name: data.name,
        firstAccessDone: true,
      });

      const publicKey = GeneratePublicKey();

      await companyRepository.update(company._id, {
        ...company.toJSON(),
        accessKey: {
          isValid: true,
          publicKey: encrypt(publicKey),
        },
      });

      return ok();
    } catch (err) {
      console.log(err);
      return badRequest(new Error('Invalid Params.'));
    }
  }
}
