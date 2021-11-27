//Config for our database
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Quote } from '../entities/quote.entity';
import { Vote } from '../entities/vote.entity';

//config file za povezavo na database
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '194.249.251.33',
  port: 5432,
  username: 'skillup0103',
  password: 'Pr3s3nt-85',
  database: 'Skulj_SkillUp_01',
  entities: [User, Quote, Vote],
  synchronize: true,
};
