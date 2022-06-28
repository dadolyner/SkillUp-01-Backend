//Quote entity
import {
	BaseEntity,
	Column,
	Entity,
	OneToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Votes } from './votes.entity';

@Entity('quotes')
export class Quotes extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	quote: string;

	@OneToMany(() => Votes, (vote) => vote.quote, { onDelete: 'CASCADE' })
	votes: Votes[];

	@OneToOne(() => Users, (user) => user.quote, { onDelete: 'CASCADE' })
	@JoinColumn()
	user: Users;
}
