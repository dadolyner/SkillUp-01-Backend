//User/Quote Controller
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { Users } from 'src/entities/users.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    
    // Get users information
    @UseGuards(AuthGuard())
    @Get('/me')
    getUserInfo(@GetUser() user: Users) {
        return this.userService.getUserInfo(user);
    }

    // Get users information by ID
    @Get('/:id')
    getUserInfoById(@Param() userId: string) {
        return this.userService.getUserInfoById(userId);
    }
}
