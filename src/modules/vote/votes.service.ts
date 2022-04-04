import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { UserRepository } from '../user/user.repository';
import { VoteRepository } from './votes.repository';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteRepository)
    private voteRepository: VoteRepository,
    private userRepository: UserRepository,
  ) {}

  //upvote a quote
  async upVote(user: User, quote: Quote): Promise<Vote> {
    const votedQuote = await this.userRepository.findOne(quote.id);

    if (!votedQuote) {
      throw new NotFoundException(`Quote with ID "${quote.id}" not found`);
    }

    return this.voteRepository.upVote(user, votedQuote);
  }

  //downvote a quote
  async downVote(user: User, quote: Quote): Promise<Vote> {
    const votedQuote = await this.userRepository.findOne(quote.id);

    if (!votedQuote) {
      throw new NotFoundException(`Quote with ID "${quote.id}" not found`);
    }

    return this.voteRepository.downVote(user, votedQuote);
  }
}
