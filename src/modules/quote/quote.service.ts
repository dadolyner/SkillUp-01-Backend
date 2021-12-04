import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { VoteRepository } from '../vote/votes.repository';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteRepository } from './quote.repository';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(QuoteRepository)
    private quoteRepository: QuoteRepository,
    private voteRepository: VoteRepository,
  ) {}

  //return all quotes
  async getQuotes(): Promise<Quote[]> {
    const quotes = this.quoteRepository.getQuotes();
    for (let i = 0; i < (await quotes).length; i++) {
      (await quotes).map((quote) =>
        Object.assign(quote, { votes: 'count number' }),
      );
    }
    return quotes;
  }

  //return one specific quote
  async getQuoteById(id: string): Promise<Quote> {
    const quote = await this.quoteRepository.findOne(id);

    if (!quote) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }

    return quote;
  }

  //create or update user created quote
  async createOrUpdateQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    return this.quoteRepository.createOrUpdateQuote(createQuoteDto, user);
  }

  //delete an existing quote
  async deleteQuote(user: User): Promise<void> {
    const result = await this.quoteRepository.delete({ user });

    if (result.affected === 0) {
      throw new NotFoundException(
        `User "${user.username}" does not have a quote.`,
      );
    }
  }
}
