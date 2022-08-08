import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'expenses',
  synchronize: false,
  entities: ['src/*/entities/*.entity.js'], // maybe you should also consider chage it to something like:  [__dirname + '/**/*.entity.ts', __dirname + '/src/**/*.entity.js']
  migrations: ['src/migrations/*.js'],
};

const devDataSource = new DataSource(config);
export default devDataSource;
