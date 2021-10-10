//User/Quote Controller
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../entities/quote.entity';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/auth/dto/auth-credentials-login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //get request that return all quotes
  @Get('/allQuotes')
  getQuotes(): Promise<Quote[]> {
    return this.userService.getQuotes();
  }

  //get request to return one specific quote
  @UseGuards(AuthGuard())
  @Get('/myQuote')
  getQuoteId(@GetUser() user: User): Promise<Quote> {
    return this.userService.getQuoteById(user);
  }

  //post request to create a new quote
  @UseGuards(AuthGuard())
  @Post('/myQuote')
  @UsePipes(ValidationPipe)
  createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.userService.createQuote(createQuoteDto, user);
  }

  //delete request to delete an existing quote
  @UseGuards(AuthGuard())
  @Delete('/myQuote/delete')
  deleteQuote(@GetUser() user: User): Promise<void> {
    return this.userService.deleteQuote(user);
  }

  //update request to update an existing quote
  @UseGuards(AuthGuard())
  @Patch('/myQuote/edit')
  updateQuote(@Body() quote: string, @GetUser() user: User): Promise<Quote> {
    return this.userService.updateQuote(quote, user);
  }

  //update request for update password
  @UseGuards(AuthGuard())
  @Patch('/me/update-password')
  updatePassword(
    @Body(ValidationPipe)
    userCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<void> {
    return this.userService.updatePassword(userCredentialsDto);
  }

  //get user information
  @UseGuards(AuthGuard())
  @Get('/me')
  getUserInfo(user: User) {
    return this.userService.getUserInfo(user);
  }
}
