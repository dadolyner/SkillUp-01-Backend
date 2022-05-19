//User/Quote Repository
import { EntityRepository, Repository } from 'typeorm';
import { Quote } from '../../entities/quote.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(Quote)
export class UserRepository extends Repository<Quote> {
  //hash password
  private hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
