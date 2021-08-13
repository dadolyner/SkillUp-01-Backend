import { Body, Controller, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //post request for signup
  @Post('/signup')
  signUp(
    @Body(ValidationPipe)
    userCredentialsDto: UserCredentialsDto,
  ): Promise<void> {
    return this.userService.signUp(userCredentialsDto);
  }

  //post request for signin
  @Post('/login')
  logIn(
    @Body(ValidationPipe)
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accesToken: string }> {
    return this.userService.logIn(userCredentialsDto);
  }

  //update request for update password
  @Patch('/me/update-password')
  updatePassword(
    @Body(ValidationPipe)
    userCredentialsDto: UserCredentialsDto,
  ): Promise<void> {
    return this.userService.updatePassword(userCredentialsDto);
  }
}
