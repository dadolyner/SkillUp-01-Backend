import { Vote } from 'src/entities/vote.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Quote } from 'src/entities/quote.entity';

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
  //upvote a selected quote
  async upVote(user: User, quote: Quote): Promise<Vote> {
    const myVote = await this.findOne({ user });
    if (!myVote) {
      const vote = new Vote();
      vote.user = user;
      vote.quote = quote;
      vote.vote = 1;
      return await this.save(vote);
    } else {
      myVote.user = user;
      myVote.quote = quote;
      myVote.vote = 1;
      return await this.save(myVote);
    }
  }

  //upvote a selected quote
  async downVote(user: User, quote: Quote): Promise<Vote> {
    const myVote = await this.findOne({ user });
    if (!myVote) {
      const vote = new Vote();
      vote.user = user;
      vote.quote = quote;
      vote.vote = -1;
      return await this.save(vote);
    } else {
      myVote.user = user;
      myVote.quote = quote;
      myVote.vote = -1;
      return await this.save(myVote);
    }
  }

  //function that will count all the votes for a quote
  async countVotes(quote: Quote): Promise<number> {
    const votes = await this.find({ quote });
    let count = 0;
    votes.forEach((vote) => {
      count += vote.vote;
    });
    return count;
  }
}
