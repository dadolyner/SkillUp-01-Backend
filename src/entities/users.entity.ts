//User Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Unique,
    OneToMany,
    OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Votes } from './votes.entity';
import { Quotes } from './quotes.entity';

@Entity('users')
@Unique(['email'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    salt: string;

    @Column()
    password: string;

    // Relations
    @OneToMany(() => Votes, (vote) => vote.user, { onDelete: 'CASCADE' })
    votes: Votes[];

    @OneToOne(() => Quotes, (quote) => quote.user, { onDelete: 'CASCADE' })
    quote: Quotes;

    // Validate users password
    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    // Hash password
    async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}
