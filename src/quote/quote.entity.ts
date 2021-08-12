import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quote: string;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: 0 })
  downvotes: number;
}
