import { Votes } from 'src/entities/votes.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { Quotes } from 'src/entities/quotes.entity';

@EntityRepository(Votes)
export class VoteRepository extends Repository<Votes> {
    //upvote a selected quote
    async upVote(user: Users, quote: Quotes): Promise<Votes> {
        const myVote = await this.findOne({ user, quote });
        if (!myVote) {
            const vote = new Votes();
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
    async downVote(user: Users, quote: Quotes): Promise<Votes> {
        const myVote = await this.findOne({ user, quote });
        if (!myVote) {
            const vote = new Votes();
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

    // Remove keys from the object
    removeKeys = (myVote: Votes) => {
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
