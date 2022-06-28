import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Quotes } from 'src/entities/quotes.entity';
import { Users } from 'src/entities/users.entity';
import { Votes } from 'src/entities/votes.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { VoteService } from './votes.service';

@Controller('vote')
export class VoteController {
    constructor(private voteService: VoteService) { }

    // UpVote a quote with ID
    @UseGuards(AuthGuard())
    @Post('/:id/upvote')
    upVote(@GetUser() user: Users, @Param() quote: Quotes): Promise<Votes> {
        return this.voteService.upVote(user, quote);
    }

    // DownVote a quote with ID
    @UseGuards(AuthGuard())
    @Post('/:id/downvote')
    downVote(@GetUser() user: Users, @Param() quote: Quotes): Promise<Votes> {
        return this.voteService.downVote(user, quote);
    }
}
