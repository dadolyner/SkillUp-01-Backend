import { Module } from '@nestjs/common';
import { VoteService } from './votes.service';
import { VoteController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteRepository } from './votes.repository';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { QuoteRepository } from '../quote/quote.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([QuoteRepository]),
        TypeOrmModule.forFeature([VoteRepository]),
        TypeOrmModule.forFeature([UserRepository]),
        AuthModule,
    ],
    providers: [VoteService, UserService],
    controllers: [VoteController],
})
export class VoteModule { }
