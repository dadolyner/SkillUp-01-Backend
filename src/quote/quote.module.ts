import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { QuoteController } from './quote.controller';
import { QuoteRepository } from './quote.repository';
import { QuoteService } from './quote.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteRepository]), UserModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
