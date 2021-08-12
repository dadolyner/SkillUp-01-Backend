import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../entities/quote.entity';
import { QuoteRepository } from './quote.repository';

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
}
