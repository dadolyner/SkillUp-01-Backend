//Vote entity
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quote } from './quote.entity';
import { User } from './user.entity';

@Entity()
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quote: string;

  @Column({ default: 0 })
  votes: number;

  //relation
  @ManyToOne(() => User, (user) => user.votes)
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne(() => Quote, (quotes) => quotes.votes)
  quotes: Quote;
}
