import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthLoginCredentialsDto } from './dto/auth-credentials-login.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthSignUpCredentialsDto } from './dto/auth-credentials-signup.dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  //signup our user into the database
  async signUp(signupCredentials: AuthSignUpCredentialsDto): Promise<void> {
    const { first_name, last_name, email, birthDate, username, password } =
      signupCredentials;

    const user = new User();
    user.first_name = first_name;
    user.last_name = last_name;
    user.username = username;
    user.email = email;
    user.birthDate = birthDate;
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

  //validate inserted password
  async validateUserPassword(
    userCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<string> {
    const { username, password } = userCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  //hash password
  private hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
