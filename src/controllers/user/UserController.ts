import { Request, Response } from "express";
import { UserService } from "../../services/user/UserService";
import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { ResJson } from "../../utils";

const postgresUsersRepository = new PostgresUsersRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const userService = new UserService(
  postgresUsersRepository,
  mailtrapMailProvider
);

export class UserController {

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    
    try {
      const user = await userService.create({
        name,
        email,
        password
      })
      return ResJson(response, 201, true, user);
    } catch (err) {
      return ResJson(response, 400, false, err.message || 'Unexpected error.');
    }
  }
}