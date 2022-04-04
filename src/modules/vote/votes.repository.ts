import { Vote } from 'src/entities/vote.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Quote } from 'src/entities/quote.entity';

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
  //upvote a selected quote
  async upVote(user: User, quote: Quote): Promise<Vote> {
    const myVote = await this.findOne({ user, quote });
    if (!myVote) {
      const vote = new Vote();
      vote.user = user;
      vote.quote = quote;
      vote.vote = 1;
      this.removeKeys(vote);
      return await this.save(vote);
    } else {
      myVote.user = user;
      myVote.quote = quote;
      myVote.vote = 1;
      this.removeKeys(myVote);
      return await this.save(myVote);
    }
  }

  //upvote a selected quote
  async downVote(user: User, quote: Quote): Promise<Vote> {
    const myVote = await this.findOne({ user, quote });
    if (!myVote) {
      const vote = new Vote();
      vote.user = user;
      vote.quote = quote;
      vote.vote = -1;
      this.removeKeys(vote);
      return await this.save(vote);
    } else {
      myVote.user = user;
      myVote.quote = quote;
      myVote.vote = -1;
      this.removeKeys(myVote);
      return await this.save(myVote);
    }
  }

  //removes sensitive data from outputed object
  removeKeys = (myVote) => {
    const userKeys = Object.keys(myVote.user);
    userKeys.forEach((userKey) => {
      if (
        userKey == 'first_name' ||
        userKey == 'last_name' ||
        userKey == 'username' ||
        userKey == 'email' ||
        userKey == 'password' ||
        userKey == 'salt'
      ) {
        delete myVote.user[userKey];
      }
    });
  };
}
