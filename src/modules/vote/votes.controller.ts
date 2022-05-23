import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { VoteService } from './votes.service';

@Controller('vote')
export class VoteController {
    constructor(private voteService: VoteService) { }

    @UseGuards(AuthGuard())
    @Post('/:id/upvote')
    upVote(@GetUser() user: User, @Param() quote: Quote): Promise<Vote> {
        return this.voteService.upVote(user, quote);
    }

    @UseGuards(AuthGuard())
    @Post('/:id/downvote')
    downVote(@GetUser() user: User, @Param() quote: Quote): Promise<Vote> {
        return this.voteService.downVote(user, quote);
    }
}
