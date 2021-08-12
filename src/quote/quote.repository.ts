import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './quote.entity';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {
  async getQuotes(): Promise<Quote[]> {
    const query = this.createQueryBuilder('quote');
    const quotes = await query.getMany();
    return quotes;
  }

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const quote = createQuoteDto;
    const myQuote = this.create(quote);
    await this.save(myQuote);
    return myQuote;
  }
}
