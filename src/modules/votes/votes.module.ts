import { Module } from '@nestjs/common';
import { VoteService } from './votes.service';
import { VotesController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [VoteService],
  controllers: [VotesController],
})
export class VotesModule {}
