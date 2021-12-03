import { Vote } from 'src/entities/vote.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Quote } from 'src/entities/quote.entity';

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
  //upvote a quote that gets a quote id from user
  async upVote(user: User, quote: Quote): Promise<Vote> {
    const vote = new Vote();
    vote.user = user;
    vote.quote = quote;
    vote.vote = 1;
    return await this.save(vote);
  }

  //upvote a quote
  async downVote(user: User, quote: Quote): Promise<Vote> {
    const vote = new Vote();
    vote.vote = -1;
    vote.user = user;
    vote.quote = quote;
    return this.save(vote);
  }
}
