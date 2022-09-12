import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { typeOrmConnectionDataSource } from './../ormconfig';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await typeOrmConnectionDataSource.initialize();
        return typeOrmConnectionDataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
