import { User } from '@data/do/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  saveUser(user: User): Promise<User> {
    return this.save(user);
  }

  findUser(username: string): Promise<User> {
    return this.findOne(username);
  }

  deleteUser(username: string) {
    return this.delete(username);
  }
}
