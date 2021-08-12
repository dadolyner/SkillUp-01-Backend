import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../entities/quote.entity';
import { QuoteRepository } from './quote.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(QuoteRepository)
    private quoteRepository: QuoteRepository,
  ) {}

  getQuotes(): Promise<Quote[]> {
    return this.quoteRepository.getQuotes();
  }

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.quoteRepository.createQuote(createQuoteDto);
  }

  async getQuoteById(id: number, user: User): Promise<Quote> {
    const found = await this.quoteRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async deleteQuote(id: string): Promise<void> {
    const result = await this.quoteRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }
  }
}
