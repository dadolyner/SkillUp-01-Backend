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
import { Quotes } from 'src/entities/quotes.entity';
import { Users } from 'src/entities/users.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
    constructor(private quoteService: QuoteService) { }

    // get request that return all quotes
    @Get('/list')
    getQuotes(): Promise<Quotes[]> {
        return this.quoteService.getQuotes();
    }

    @Get('/:id')
    getQuoteById(@Param() id: string): Promise<Quotes> {
        return this.quoteService.getQuoteById(id);
    }

    //get users quote
    @UseGuards(AuthGuard())
    @Get('/myquote')
    getMyQuote(@GetUser() user: Users): Promise<Quotes> {
        return this.quoteService.getMyQuote(user);
    }

    // post request to create a new quote or update an existing quote
    @UseGuards(AuthGuard())
    @Post('/myquote')
    updateQuote(@Body() createQuoteDto: CreateQuoteDto, @GetUser() user: Users): Promise<Quotes> {
        return this.quoteService.createOrUpdateQuote(createQuoteDto, user);
    }

    // delete request to delete an existing quote
    @UseGuards(AuthGuard())
    @Delete('/delete')
    deleteQuote(@GetUser() user: Users): Promise<void> {
        return this.quoteService.deleteQuote(user);
    }
}
