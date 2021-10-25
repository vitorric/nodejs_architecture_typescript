import { GeneratePublicKey, RandomString } from '@core/utils';
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

  async login(user: User, jwt: IJWTProvider): Promise<ControllerResponse> {
    try {
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

      console.log('publicKey: ', publicKey);

      return ok();
    } catch (err) {
      console.log(err);
      return badRequest(new Error('Invalid Params.'));
    }
  }
}
