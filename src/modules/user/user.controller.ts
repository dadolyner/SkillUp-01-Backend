//User/Quote Controller
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../../entities/quote.entity';
import { UserService } from './user.service';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/modules/auth/dto/auth-credentials-login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //get request that return all quotes
  @Get('/list')
  getQuotes(): Promise<Quote[]> {
    return this.userService.getQuotes();
  }

  //post request to create a new quote or update an existing quote
  @UseGuards(AuthGuard())
  @Post('/myquote')
  updateQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.userService.createOrUpdateQuote(createQuoteDto, user);
  }

  //delete request to delete an existing quote
  @UseGuards(AuthGuard())
  @Delete('/myquote/delete')
  deleteQuote(@GetUser() user: User): Promise<void> {
    return this.userService.deleteQuote(user);
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
  getUserInfo(@GetUser() user: User) {
    return this.userService.getUserInfo(user);
  }
}
