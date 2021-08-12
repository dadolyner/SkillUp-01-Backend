import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Vote } from './vote.entity';

@Entity()
export class Quote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quote: string;

  //relation
  @OneToMany(() => Vote, (vote) => vote.quote) //relation to votes
  votes: Vote[];

  @ManyToOne(() => User, (user) => user.quote)
  @JoinColumn()
  user: User;
}
