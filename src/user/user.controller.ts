import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginCredentialsDto } from './dto/user-credentials-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserSignUpCredentialsDto } from './dto/user-credentials-signup.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //post request for signup
  @Post('/signup')
  signUp(
    @Body(ValidationPipe)
    userSignupCredentialsDto: UserSignUpCredentialsDto,
  ): Promise<void> {
    return this.userService.signUp(userSignupCredentialsDto);
  }

  //post request for signin
  @Post('/login')
  logIn(
    @Body(ValidationPipe)
    userCredentialsDto: UserLoginCredentialsDto,
  ): Promise<{ accesToken: string }> {
    return this.userService.logIn(userCredentialsDto);
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
}
