import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { UserLoginCredentialsDto } from 'src/auth/dto/auth-credentials-login.dto';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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
    return myQuote;
  }

  //update user password
  async updatePassword(
    userCredentialsDto: UserLoginCredentialsDto,
  ): Promise<void> {
    const { username, password } = userCredentialsDto;
    const user = await User.findOne({ username });

    if (!user) {
      throw new NotFoundException(
        `Unable to find user with Username "${username}".`,
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
