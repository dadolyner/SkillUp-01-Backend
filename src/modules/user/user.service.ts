//User/Quote Service
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../../entities/quote.entity';
import { UserRepository } from './user.repository';
import { User } from '../../entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/modules/auth/dto/auth-credentials-login.dto';

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
  async getQuoteById(user: User): Promise<Quote> {
    const found = await this.userRepository.findOne({ where: { user } });

    if (!found) {
      throw new NotFoundException(
        `User "${user.username}" does not have a quote.`,
      );
    }

    return found;
  }

  //create or update user created quote
  async createOrUpdateQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    return this.userRepository.createOrUpdateQuote(createQuoteDto, user);
  }

  //delete an existing quote
  async deleteQuote(user: User): Promise<void> {
    const result = await this.userRepository.delete({ user });

    if (result.affected === 0) {
      throw new NotFoundException(
        `User "${user.username}" does not have a quote.`,
      );
    }
  }

  //updates user password
  async updatePassword(
    authCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<void> {
    return this.userRepository.updatePassword(authCredentialsDto);
  }

  //outputs user info without sensitive data
  async getUserInfo(user: User) {
    return this.userRepository.getUserInfo(user);
  }
}
