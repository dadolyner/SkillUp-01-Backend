import { Quotes } from 'src/entities/quotes.entity';
import { Users } from 'src/entities/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';

@EntityRepository(Quotes)
export class QuoteRepository extends Repository<Quotes> {
    // function that creates or updates a quote
    async createOrUpdateQuote(createQuoteDto: CreateQuoteDto, user: Users): Promise<Quotes> {
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
