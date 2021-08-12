import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthorizationCredentialsDto } from './dto/authorization-credentials.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(
    authorizationCredentialsDto: AuthorizationCredentialsDto,
  ): Promise<void> {
    const { username, password } = authorizationCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await this.save(user);
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Username already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  //potrditi preveri če je bilo vneseno pravilno geslo
  async validateUserPassword(
    authorizationCredentialsDto: AuthorizationCredentialsDto,
  ): Promise<string> {
    const { username, password } = authorizationCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  //kriprieanje gesla
  private hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
