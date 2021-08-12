import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';

@Module({
  providers: [QuoteService],
  controllers: [QuoteController],
})
export class QuoteModule {}
