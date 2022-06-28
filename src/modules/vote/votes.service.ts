import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quotes } from 'src/entities/quotes.entity';
import { Users } from 'src/entities/users.entity';
import { Votes } from 'src/entities/votes.entity';
import { UserRepository } from '../user/user.repository';
import { VoteRepository } from './votes.repository';

@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(VoteRepository) private voteRepository: VoteRepository,
        private userRepository: UserRepository,
    ) { }

    // UpVote a quote with ID
    async upVote(user: Users, quote: Quotes): Promise<Votes> {
        const votedQuote = await this.userRepository.findOne(quote.id);

        if (!votedQuote) throw new NotFoundException(`Quote with ID "${quote.id}" not found`);

        return this.voteRepository.upVote(user, votedQuote);
    }

    // DownVote a quote with ID
    async downVote(user: Users, quote: Quotes): Promise<Votes> {
        const votedQuote = await this.userRepository.findOne(quote.id);

        if (!votedQuote) throw new NotFoundException(`Quote with ID "${quote.id}" not found`);

        return this.voteRepository.downVote(user, votedQuote);
    }
}
