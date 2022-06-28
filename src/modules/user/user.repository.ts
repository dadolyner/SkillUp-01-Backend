//User/Quote Repository
import { EntityRepository, Repository } from 'typeorm';
import { Quotes } from 'src/entities/quotes.entity';

@EntityRepository(Quotes)
export class UserRepository extends Repository<Quotes> { }
