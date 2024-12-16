import { DataSource } from 'typeorm';


// eslint-disable-next-line @typescript-eslint/no-var-requires
//require('dotenv').config({ path: 'ormconfig.env' });


export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username:'development',
  password: 'development',
  database: 'naughty_walk',
  schema: 'naughty_walk_db',
  synchronize: true,
  migrations: ['dist/migration/*.js'],
  //migrations: ['dist/Infraestructure/DataModel/TypeOrm/**/*.js'],
});