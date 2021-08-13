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

  //return all quotes
  getQuotes(): Promise<Quote[]> {
    return this.quoteRepository.getQuotes();
  }

  //return one specific quote
  async getQuoteById(id: string, user: User): Promise<Quote> {
    const found = await this.quoteRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Quote with ID "${id}" not found.`);
    }

    return found;
  }

  //create a new quote
  async createQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    return this.quoteRepository.createQuote(createQuoteDto, user);
  }

  //delete an existing quote
  async deleteQuote(id: string, user: User): Promise<void> {
    const result = await this.quoteRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Unable to delete Quote with ID "${id}".`);
    }
  }

  //update user created quote
  async updateQuote(id: string, quote: string, user: User): Promise<Quote> {
    const myQuote = await this.getQuoteById(id, user);
    myQuote.quote = Object.values(quote)[0];
    myQuote.user = user;
    await myQuote.save();

    if (!myQuote) {
      throw new NotFoundException(`Unable to edit Quote with ID "${id}".`);
    }

    return myQuote;
  }
}
