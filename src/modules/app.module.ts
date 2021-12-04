import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from '../config/typeorm.config';
import { QuoteModule } from './user/user.module';
import { VoteModule } from './vote/votes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    QuoteModule,
    VoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
