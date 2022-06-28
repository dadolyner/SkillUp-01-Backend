//User/Quote Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Users } from '../../entities/users.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) { }

    //outputs user info without sensitive data
    async getUserInfo(user: Users): Promise<Users> {
        const userInfo = await this.userRepository
            .createQueryBuilder()
            .select([
                'user.id',
                'user.first_name',
                'user.last_name',
                'user.username',
                'user.email',
                'quote.id',
                'quote.quote',
                'vote.id',
                'vote.vote',
                'vote.quoteId',
            ])
            .from(Users, 'user')
            .leftJoin('user.quote', 'quote')
            .leftJoin('user.votes', 'vote')
            .where('user.id = :id', { id: user.id })
            .getOne();

        return userInfo;
    }

    //outputs selected user info by passing in his UUID without sensitive data
    async getUserInfoById(userId: string): Promise<Users> {
        const userInfo = await this.userRepository
            .createQueryBuilder()
            .select([
                'user.id',
                'user.first_name',
                'user.last_name',
                'user.username',
                'user.email',
                'quote.id',
                'quote.quote',
                'vote.id',
                'vote.vote',
                'vote.quoteId',
            ])
            .from(Users, 'user')
            .leftJoin('user.quote', 'quote')
            .leftJoin('user.votes', 'vote')
            .where(userId)
            .getOne();

        return userInfo;
    }
}
