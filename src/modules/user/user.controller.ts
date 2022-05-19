//User/Quote Controller
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  //get user information
  @UseGuards(AuthGuard())
  @Get('/me')
  getUserInfo(@GetUser() user: User) {
    return this.userService.getUserInfo(user);
  }
}
