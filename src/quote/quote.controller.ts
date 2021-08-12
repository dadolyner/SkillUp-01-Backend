import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './quote.entity';
import { QuoteService } from './quote.service';

@UseGuards(AuthGuard())
@Controller('quote')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @Get('/allQuotes')
  getQuotes(): Promise<Quote[]> {
    return this.quoteService.getQuotes();
  }

  @Post('/createQuote')
  createQuote(@Body() createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.quoteService.createQuote(createQuoteDto);
  }
}
