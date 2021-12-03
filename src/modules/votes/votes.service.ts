import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { VoteRepository } from './votes.repository';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteRepository)
    private voteRepository: VoteRepository,
  ) {}

  //upvote a quote
  async upVote(user: User, quote: Quote): Promise<Vote> {
    return this.voteRepository.upVote(user, quote);
  }

  //downvote a quote
  async downVote(user: User, quote: Quote): Promise<Vote> {
    return this.voteRepository.downVote(user, quote);
  }
}
