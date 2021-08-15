import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginCredentialsDto } from './dto/auth-credentials-login.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { User } from 'src/entities/user.entity';
import { UserSignUpCredentialsDto } from './dto/auth-credentials-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  //return one specific quote
  async getUserById(id: string, user: User): Promise<User> {
    const found = await this.authRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Quote with ID "${id}" not found.`);
    }

    return found;
  }

  //signup - registration
  async signUp(signupCredentials: UserSignUpCredentialsDto): Promise<void> {
    return this.authRepository.signUp(signupCredentials);
  }

  //signin - login with jwt tokens
  async logIn(
    userCredentialsDto: UserLoginCredentialsDto,
  ): Promise<{ accesToken: string }> {
    const username = await this.authRepository.validateUserPassword(
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
