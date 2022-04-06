import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { VoteRepository } from '../vote/votes.repository';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteRepository } from './quote.repository';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(QuoteRepository)
    private quoteRepository: QuoteRepository,
    private voteRepository: VoteRepository,
    private userRepository: UserRepository,
  ) {}

  // function tha returns all quotes
  async getQuotes(): Promise<Quote[]> {
    const quotes = this.quoteRepository
      .createQueryBuilder()
      .select([
        'user.first_name',
        'user.last_name',
        'quote.id',
        'quote.quote',
        'vote.vote',
      ])
      .from(Quote, 'quote')
      .innerJoin('quote.user', 'user')
      .innerJoin('quote.votes', 'vote')
      .getMany();

    return quotes;
  }

  // function that return one specific quote
  async getQuoteById(id: string): Promise<Quote> {
    const quote = await this.quoteRepository.findOne(id);

    if (!quote) throw new NotFoundException(`Quote with ID "${id}" not found`);

    return quote;
  }

  // find quote where userid is equal to the userid of the user
  async getMyQuote(user: User): Promise<Quote> {
    const quote = await this.quoteRepository
      .createQueryBuilder('quote')
      .select(['quote.id', 'quote.quote'])
      .where('quote.user = :user', { userId: user.id })
      .getOne();

    if (!quote)
      throw new NotFoundException(`User "${user}" does not have a quote`);

    return quote;
  }

  // function that creates or updates a quote
  async createOrUpdateQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    return this.quoteRepository.createOrUpdateQuote(createQuoteDto, user);
  }

  // function that deletes an existing quote
  async deleteQuote(user: User): Promise<void> {
    const result = await this.quoteRepository.delete({ user });
    if (result.affected === 0)
      throw new NotFoundException(
        `User "${user.username}" does not have a quote.`,
      );
  }
}
