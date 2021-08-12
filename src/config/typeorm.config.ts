import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Quote } from '../entities/quote.entity';
import { Vote } from '../entities/vote.entity';

//config file za povezavo na database
export const typeOrmCOnfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'SkillUp-01',
  entities: [User, Quote, Vote], //entititete katere so shranjene v datotekah
  synchronize: true,
};
