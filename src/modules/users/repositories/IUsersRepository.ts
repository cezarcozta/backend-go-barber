import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllPrivdersDTO from '@modules/users/dtos/IFindAllPRovidersDTO';

import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllPrivdersDTO): Promise<User[]>;

  findByEmail(email: string): Promise<User | undefined>;

  createAndSave(data: ICreateUserDTO): Promise<User>;

  findById(id: string): Promise<User | undefined>;

  update(user: User): Promise<User>;
}
