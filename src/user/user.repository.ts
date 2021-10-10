//User/Quote Repository
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/auth/dto/auth-credentials-login.dto';
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

  async createQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    const { quote } = createQuoteDto;
    const myQuote = this.create({ quote, user });
    await this.save(myQuote);

    //removes the password, salt and id keys from the user object
    const mainKeys = Object.keys(myQuote);
    const userKeys = Object.keys(user);
    mainKeys.forEach((mainKey) => {
      if (mainKey == 'user') {
        userKeys.forEach((userKey) => {
          if (userKey == 'password' || userKey == 'salt' || userKey == 'id') {
            delete myQuote[mainKey][userKey];
          }
        });
      }
    }, this);

    return myQuote;
  }

  async getUser(user: User) {
    const query = this.createQueryBuilder('user');
    query.where({ user });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const myUser = await query.getOne();
      return myUser;
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
