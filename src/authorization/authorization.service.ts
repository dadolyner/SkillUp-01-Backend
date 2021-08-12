import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorizationCredentialsDto } from './dto/authorization-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  //signup - registration
  async signUp(
    authorizationCredentialsDto: AuthorizationCredentialsDto,
  ): Promise<void> {
    return this.userRepository.signUp(authorizationCredentialsDto);
  }

  //signin - login with jwt tokens
  async signIn(
    authorizationCredentialsDto: AuthorizationCredentialsDto,
  ): Promise<{ accesToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authorizationCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accesToken = await this.jwtService.sign(payload);

    return { accesToken };
  }
}
