import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from 'src/config/config.typeorm';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/votes.module';
import { QuoteModule } from './quote/quote.module';

@Module({
    imports: [
        TypeOrmConfig,
        AuthModule,
        UserModule,
        VoteModule,
        QuoteModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
