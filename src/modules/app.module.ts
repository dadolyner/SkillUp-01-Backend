import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from '../config/config.typeorm';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/votes.module';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    VoteModule,
    QuoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
