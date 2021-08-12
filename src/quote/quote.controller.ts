import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
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

  //return all quotes
  @Get('/allQuotes')
  getQuotes(): Promise<Quote[]> {
    return this.quoteService.getQuotes();
  }

  //return one specific quote
  @Get('/:id')
  getTaskId(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quoteService.getQuoteById(id, user);
  }

  //create a new quote
  @Post('/createQuote')
  @UsePipes(ValidationPipe)
  createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quoteService.createQuote(createQuoteDto, user);
  }

  //delete an existing quote
  @Delete('/:id')
  deleteQuote(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.quoteService.deleteQuote(id, user);
  }

  //update an existing quote
  @Patch('/:id/myQuote')
  updateTaskStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() quote: string,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quoteService.updateTaskStatus(id, quote, user);
  }
}
