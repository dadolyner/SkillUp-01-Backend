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

  @Column({ default: 0 })
  votes: number;

  //relation
  @ManyToOne(() => User, (user) => user.votes, { onDelete: 'CASCADE' })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne(() => Quote, (quotes) => quotes.votes, { onDelete: 'CASCADE' })
  quotes: Quote;
}
