//User/Quote Repository
import { EntityRepository, Repository } from 'typeorm';
import { Quote } from '../../entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/modules/auth/dto/auth-credentials-login.dto';
import * as bcrypt from 'bcrypt';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@EntityRepository(Quote)
export class UserRepository extends Repository<Quote> {
  //create function that returns all user info
  async getUserInfo(user: User) {
    const userInfo = this.create({ user });
    const userKeys = Object.keys(userInfo.user);

    if (!userInfo) {
      throw new NotFoundException('User not found');
    }

    try {
      userKeys.forEach((userKey) => {
        if (userKey == 'password' || userKey == 'salt') {
          delete userInfo.user[userKey];
        }
      });

      return userInfo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //update user password
  async updatePassword(
    userCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<void> {
    const { email, password } = userCredentialsDto;
    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundException(
        `Unable to find user with Username "${email}".`,
      );
    } else {
      user.password = await this.hashPassword(password, user.salt);
      await User.save(user);
    }
  }

  //hash password
  private hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
