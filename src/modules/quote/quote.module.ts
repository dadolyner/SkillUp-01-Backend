import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteRepository } from './quote.repository';
import { AuthModule } from '../auth/auth.module';
import { VoteRepository } from '../vote/votes.repository';
import { UserRepository } from '../user/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([QuoteRepository]),
        TypeOrmModule.forFeature([VoteRepository]),
        TypeOrmModule.forFeature([UserRepository]),
        AuthModule,
    ],
    providers: [QuoteService],
    controllers: [QuoteController],
})
export class QuoteModule { }
