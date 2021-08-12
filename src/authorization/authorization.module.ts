import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'SkillUpArea51',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthorizationModule {}
