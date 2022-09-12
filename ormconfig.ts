import { DataSource } from 'typeorm';

export const typeOrmConnectionDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'expenses_live',
  synchronize: false,
  entities: ['dist/src/*/entities/*.entity.js'], // maybe you should also consider chage it to something like:  [__dirname + '/**/*.entity.ts', __dirname + '/src/**/*.entity.js']
  migrations: ['dist/src/migrations/*.js'],
});
