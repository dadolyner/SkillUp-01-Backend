//User/Quote Service
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../entities/quote.entity';
import { UserRepository } from './user.repository';
import { User } from '../entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/auth/dto/auth-credentials-login.dto';
import { AuthSignUpCredentialsDto } from 'src/auth/dto/auth-credentials-signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  //return all quotes
  getQuotes(): Promise<Quote[]> {
    return this.userRepository.getQuotes();
  }

  //return one specific quote
  async getQuoteById(id: string, user: User): Promise<Quote> {
    const found = await this.userRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Quote with ID "${id}" not found.`);
    }

    return found;
  }

  //create a new quote
  async createQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    return this.userRepository.createQuote(createQuoteDto, user);
  }

  //delete an existing quote
  async deleteQuote(id: string, user: User): Promise<void> {
    const result = await this.userRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Unable to delete Quote with ID "${id}".`);
    }
  }

  //update user created quote
  async updateQuote(id: string, quote: string, user: User): Promise<Quote> {
    const myQuote = await this.getQuoteById(id, user);
    myQuote.quote = Object.values(quote)[0];
    myQuote.user = user;
    await myQuote.save();

    if (!myQuote) {
      throw new NotFoundException(`Unable to edit Quote with ID "${id}".`);
    }

    return myQuote;
  }

  //updates user password
  async updatePassword(
    authCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<void> {
    return this.userRepository.updatePassword(authCredentialsDto);
  }

  //outputs user info without sensitive data
  async getUserInfo(authSignupDto: AuthSignUpCredentialsDto) {
    return this.userRepository.getUser(authSignupDto);

    /* const keys = Object.keys(found);
    keys.forEach((key) => {
      if (key == 'id' || key == 'salt' || key == 'password') {
        delete found[key];
      }
    }); */
  }
}
