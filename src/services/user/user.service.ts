import { UserRepository } from '@repository/user/user.repository';
import { User } from '@data/do/user.entity';
import { UserDto } from '@data/dto/user.dto';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  saveUser(userDto: UserDto): Promise<User> {
    const user: User = plainToClass(User, userDto);
    return this.userRepository.saveUser(user);
  }

  findUser(username: string) {
    return this.userRepository.findUser(username);
  }
}
