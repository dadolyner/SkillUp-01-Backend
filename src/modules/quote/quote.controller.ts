import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  //get request that return all quotes
  @Get('/list')
  getQuotes(): Promise<Quote[]> {
    return this.quoteService.getQuotes();
  }

  @Get('/:id')
  getQuoteById(@Param() id: string): Promise<Quote> {
    return this.quoteService.getQuoteById(id);
  }

  //post request to create a new quote or update an existing quote
  @UseGuards(AuthGuard())
  @Post('/myquote')
  updateQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quoteService.createOrUpdateQuote(createQuoteDto, user);
  }

  //delete request to delete an existing quote
  @UseGuards(AuthGuard())
  @Delete('/delete')
  deleteQuote(@GetUser() user: User): Promise<void> {
    return this.quoteService.deleteQuote(user);
  }
}
