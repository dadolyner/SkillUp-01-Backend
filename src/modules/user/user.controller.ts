//User/Quote Controller
import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/modules/auth/dto/auth-credentials-login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
