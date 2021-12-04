//User/Quote Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from '../../entities/user.entity';
import { AuthLoginCredentialsDto } from 'src/modules/auth/dto/auth-credentials-login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  //updates user password
  async updatePassword(
    authCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<void> {
    return this.userRepository.updatePassword(authCredentialsDto);
  }

  //outputs user info without sensitive data
  async getUserInfo(user: User) {
    return this.userRepository.getUserInfo(user);
  }
}
