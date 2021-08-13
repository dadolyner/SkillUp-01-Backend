import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  //return one specific quote
  async getUserById(id: string, user: User): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Quote with ID "${id}" not found.`);
    }

    return found;
  }

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

  //updates user password
  async updatePassword(userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.userRepository.updatePassword(userCredentialsDto);
  }
}
