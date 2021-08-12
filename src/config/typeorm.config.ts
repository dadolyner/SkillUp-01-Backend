import { TypeOrmModuleOptions } from '@nestjs/typeorm';

//config file za povezavo na database
export const typeOrmCOnfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'SkillUp-01',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], //entititete katere so shranjene v datotekah
  synchronize: true,
};
