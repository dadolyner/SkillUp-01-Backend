import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vote } from './vote.entity';

@Entity()
export class Quote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quote: string;

  //relation
  @OneToMany(() => Vote, (vote) => vote.quote, { eager: true }) //relation to votes
  votes: Vote[];
}
