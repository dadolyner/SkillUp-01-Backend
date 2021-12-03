//User/Quote Repository
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
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
  async getQuotes(): Promise<Quote[]> {
    const query = this.createQueryBuilder('quote');
    const quotes = await query.getMany();
    return quotes;
  }

  //write a user repository function that will update a quote for a user
  async createOrUpdateQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    const { quote } = createQuoteDto;
    const myQuote = await this.findOne({ user });

    if (!myQuote) {
      const myQuote = this.create({ quote, user });
      await this.save(myQuote);
    } else {
      myQuote.quote = quote;
      await this.save(myQuote);
      return myQuote;
    }
  }

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
