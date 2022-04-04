//User/Quote Repository
import { EntityRepository, Repository } from 'typeorm';
import { Quote } from '../../entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/modules/auth/dto/auth-credentials-login.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Quote)
export class UserRepository extends Repository<Quote> {
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
