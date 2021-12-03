import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { GetUser } from '../auth/get-user.decorator';
import { VoteService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private voteService: VoteService) {}

  @UseGuards(AuthGuard())
  @Post('/:id/upvote')
  updateQuote(@Body() quote: Quote, @GetUser() user: User): Promise<Vote> {
    return this.voteService.upVote(user, quote);
  }
}
