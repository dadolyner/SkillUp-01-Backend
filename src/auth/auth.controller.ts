import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginCredentialsDto } from './dto/auth-credentials-login.dto';
import { UserSignUpCredentialsDto } from './dto/auth-credentials-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //post request for signup
  @Post('/signup')
  signUp(
    @Body(ValidationPipe)
    userSignupCredentialsDto: UserSignUpCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(userSignupCredentialsDto);
  }

  //post request for signin
  @Post('/login')
  logIn(
    @Body(ValidationPipe)
    userCredentialsDto: UserLoginCredentialsDto,
  ): Promise<{ accesToken: string }> {
    return this.authService.logIn(userCredentialsDto);
  }
}
