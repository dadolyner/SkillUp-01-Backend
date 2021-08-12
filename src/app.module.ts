import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationModule } from './authorization/authorization.module';
import { typeOrmCOnfig } from './config/typeorm.config';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmCOnfig), AuthorizationModule, QuoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
