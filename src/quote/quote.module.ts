import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { QuoteController } from './quote.controller';
import { QuoteRepository } from './quote.repository';
import { QuoteService } from './quote.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteRepository]), AuthorizationModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
