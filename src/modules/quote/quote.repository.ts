import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {
  async getQuotes(): Promise<Quote[]> {
    //return all quotes and quote count from vote entity
    const query = this.createQueryBuilder('quote');
    const quotes = await query.getMany();

    return quotes;
  }

  //write a user repository function that will update a quote for a user
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
