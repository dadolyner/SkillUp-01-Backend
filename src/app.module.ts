import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationModule } from './authorization/authorization.module';
import { typeOrmCOnfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmCOnfig), AuthorizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
