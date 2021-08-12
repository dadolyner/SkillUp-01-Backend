import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { typeOrmCOnfig } from './config/typeorm.config';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmCOnfig), UserModule, QuoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
