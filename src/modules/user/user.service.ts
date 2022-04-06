//User/Quote Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from '../../entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/modules/auth/dto/auth-credentials-login.dto';
import { QuoteRepository } from '../quote/quote.repository';
import { VoteRepository } from '../vote/votes.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private quoteRapository: QuoteRepository,
    private voteRepository: VoteRepository,
  ) {}

  //updates user password
  async updatePassword(
    authCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<void> {
    return this.userRepository.updatePassword(authCredentialsDto);
  }

  //outputs user info without sensitive data
  async getUserInfo(user: User) {
    const userInfo = await this.userRepository
      .createQueryBuilder()
      .select([
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.username',
        'user.email',
        'quote.id',
        'quote.quote',
        'vote.id',
        'vote.vote',
        'vote.quoteId',
      ])
      .from(User, 'user')
      .innerJoin('user.votes', 'vote')
      .innerJoin('user.quote', 'quote')
      .where('user.id = :id', { id: user.id })
      .getOne();

    return userInfo;
  }
}
