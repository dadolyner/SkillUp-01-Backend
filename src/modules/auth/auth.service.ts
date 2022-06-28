//Authorization Service
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthLoginCredentialsDto } from './dto/auth-credentials-login.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { AuthSignUpCredentialsDto } from './dto/auth-credentials-signup.dto';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository) private authRepository: AuthRepository,
        private jwtService: JwtService,
    ) { }

    // Register user
    async signUp(signupCredentials: AuthSignUpCredentialsDto): Promise<void> {
        return this.authRepository.signUp(signupCredentials);
    }

    // Login user
    async logIn(userCredentialsDto: AuthLoginCredentialsDto): Promise<{ accesToken: string }> {
        const username = await this.authRepository.validateUserPassword(userCredentialsDto);

        if (!username) throw new UnauthorizedException('Invalid credentials');

        const payload: JwtPayload = { username };
        const accesToken = await this.jwtService.sign(payload);

        return { accesToken };
    }

    // Update user information
    async updateUser(signupCredentials: AuthSignUpCredentialsDto, user: Users): Promise<Users> {
        return this.authRepository.updateUser(signupCredentials, user);
    }
}
