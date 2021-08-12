import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../entities/quote.entity';
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

  @Delete('/:id')
  deleteQuote(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.quoteService.deleteQuote(id);
  }
}
