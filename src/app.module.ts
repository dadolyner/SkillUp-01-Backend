import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmCOnfig } from './config/typeorm.config';
import { QuoteModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmCOnfig), AuthModule, QuoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
