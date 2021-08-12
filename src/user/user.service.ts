import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  //signup - registration
  async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.userRepository.signUp(userCredentialsDto);
  }

  //signin - login with jwt tokens
  async logIn(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accesToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      userCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accesToken = await this.jwtService.sign(payload);

    return { accesToken };
  }
}
