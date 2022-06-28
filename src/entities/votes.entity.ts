//Vote entity
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Quotes } from './quotes.entity';
import { Users } from './users.entity';

@Entity('votes')
export class Votes extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    vote: number;

    @Column()
    quoteId: string;

    //relation
    @ManyToOne(() => Users, (user) => user.votes, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: Users;

    @ManyToOne(() => Quotes, (quote) => quote.votes, { onDelete: 'CASCADE' })
    @JoinColumn()
    quote: Quotes;
}
