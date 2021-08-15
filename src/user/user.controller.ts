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
import { UserService } from './user.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { UserLoginCredentialsDto } from 'src/auth/dto/auth-credentials-login.dto';

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //get request that return all quotes
  @Get('/allQuotes')
  getQuotes(): Promise<Quote[]> {
    return this.userService.getQuotes();
  }

  //get request to return one specific quote
  @Get('/:id')
  getQuoteId(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.userService.getQuoteById(id, user);
  }

  //post request to create a new quote
  @Post('/myQuote')
  @UsePipes(ValidationPipe)
  createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.userService.createQuote(createQuoteDto, user);
  }

  //delete request to delete an existing quote
  @Delete('/:id/myQuote/delete')
  deleteQuote(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.userService.deleteQuote(id, user);
  }

  //update request to update an existing quote
  @Patch('/:id/myQuote/edit')
  updateQuote(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() quote: string,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.userService.updateQuote(id, quote, user);
  }

  //update request for update password
  @UseGuards(AuthGuard())
  @Patch('/me/update-password')
  updatePassword(
    @Body(ValidationPipe)
    userCredentialsDto: UserLoginCredentialsDto,
  ): Promise<void> {
    return this.userService.updatePassword(userCredentialsDto);
  }

  //get user information
  @UseGuards(AuthGuard())
  @Get('/:username/me')
  getUserInfo(@Param('username') username: string) {
    return this.userService.getUserInfo(username);
  }
}
