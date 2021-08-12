import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../entities/quote.entity';
import { QuoteService } from './quote.service';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/entities/user.entity';

@UseGuards(AuthGuard())
@Controller('quote')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @Get('/allQuotes')
  getQuotes(): Promise<Quote[]> {
    return this.quoteService.getQuotes();
  }

  /* @Get('/:id')
  getTaskId(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quoteService.getQuoteById(id, user);
  } */

  @Post('/createQuote')
  @UsePipes(ValidationPipe)
  createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quoteService.createQuote(createQuoteDto, user);
  }

  @Delete('/:id')
  deleteQuote(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.quoteService.deleteQuote(id);
  }
}
