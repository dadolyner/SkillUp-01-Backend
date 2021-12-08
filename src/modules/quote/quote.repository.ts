import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {
  // function that returns all quotes
  async getQuotes(): Promise<Quote[]> {
    const query = this.createQueryBuilder('quote');
    const quotes = await query.getMany();
    return quotes;
  }

  // function that creates or updates a quote
  async createOrUpdateQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    const { quote } = createQuoteDto;
    const myQuote = await this.findOne({ user });

    if (!myQuote) {
      const myQuote = this.create({ quote, user });
      await this.save(myQuote);
    } else {
      myQuote.quote = quote;
      await this.save(myQuote);
      return myQuote;
    }
  }
}
