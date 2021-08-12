import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationCredentialsDto } from './dto/authorization-credentials.dto';

@Controller('authorization')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  //post request for signup
  @Post('/signup')
  signUp(
    @Body(ValidationPipe)
    authorizationCredentialsDto: AuthorizationCredentialsDto,
  ): Promise<void> {
    return this.authorizationService.signUp(authorizationCredentialsDto);
  }

  //post request for signin
  @Post('/login')
  logIn(
    @Body(ValidationPipe)
    authorizationCredentialsDto: AuthorizationCredentialsDto,
  ): Promise<{ accesToken: string }> {
    return this.authorizationService.logIn(authorizationCredentialsDto);
  }
}
