import { v4 as uuid } from 'uuid';

import { RandomString } from '@core/utils';
import { encrypt } from '@core/utils/crypto';
import { ICompanyRepository } from '@infra/db/ICompanyRepository';
import { IUserRepository } from '@infra/db/IUserRepository';
import { IJWTProvider } from '@infra/providers/IJWTProvider';

import {
  ControllerResponse,
  ok,
  badRequest,
} from '../../controllers/ControllerResponse';
import User from '../../entities/User';
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

  async get(userId: string): Promise<ControllerResponse> {
    try {
      const user = await this.userRepository.findById(userId);
      return ok(user);
    } catch (err) {
      console.log(err);
      return badRequest(new Error('Invalid Params.'));
    }
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

      await companyRepository.update(company._id, {
        ...company.toJSON(),
        accessKey: {
          isValid: true,
          publicKey: encrypt(uuid().toUpperCase()),
        },
      });

      return ok();
    } catch (err) {
      console.log(err);
      return badRequest(new Error('Invalid Params.'));
    }
  }
}
