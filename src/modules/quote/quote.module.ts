import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteRepository } from './quote.repository';
import { AuthRepository } from '../auth/auth.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuoteRepository]),
    TypeOrmModule.forFeature([AuthRepository]),
    AuthModule,
  ],
  providers: [QuoteService],
  controllers: [QuoteController],
})
export class QuoteModule {}
