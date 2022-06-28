//Authorization Repository
import {
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthLoginCredentialsDto } from './dto/auth-credentials-login.dto';
import { Users } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { AuthSignUpCredentialsDto } from './dto/auth-credentials-signup.dto';

@EntityRepository(Users)
export class AuthRepository extends Repository<Users> {

    // Register user
    async signUp(signupCredentials: AuthSignUpCredentialsDto): Promise<void> {
        const { first_name, last_name, email, username, password } = signupCredentials;

        const user = new Users();
        user.first_name = first_name;
        user.last_name = last_name;
        user.username = username;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await user.hashPassword(password, user.salt);

        try { await this.save(user) }
        catch (error) {
            if (error.code == 23505) { throw new ConflictException('Username already exist!') }
            else { throw new InternalServerErrorException() }
        }
    }

    // Update user inforamation
    async updateUser(signupCredentials: AuthSignUpCredentialsDto, user: Users): Promise<Users> {
        const { first_name, last_name, email, username, password } = signupCredentials;
        const userInfo = await this.findOne(user);

        if (!userInfo) { throw new NotFoundException(`Unable to find user with: "${signupCredentials}".`) }
        else {
            userInfo.first_name = first_name;
            userInfo.last_name = last_name;
            userInfo.username = username;
            userInfo.email = email;
            userInfo.salt = await bcrypt.genSalt();
            userInfo.password = await userInfo.hashPassword(password, userInfo.salt);

            try { await this.update(userInfo.id, userInfo) }
            catch (error) {
                if (error.code == 23505) { throw new ConflictException('Username or email already exist!') }
                else { throw new InternalServerErrorException() }
            }

            return userInfo;
        }
    }

    // Validate inserted password
    async validateUserPassword(userCredentialsDto: AuthLoginCredentialsDto): Promise<string> {
        const { email, password } = userCredentialsDto;
        const user = await this.findOne({ email });

        if (user && (await user.validatePassword(password))) return user.username;
        else return null;
    }
}
