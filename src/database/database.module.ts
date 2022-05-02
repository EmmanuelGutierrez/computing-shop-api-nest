import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { config } from 'src/config/config';

const API_KEY = '12354';
const API_KEY_PROD = 'PROD12354';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const NODE_ENV = process.env.NODE_ENV;
        const { dbLocal, dbName } = configService.mongo;
        const uri = NODE_ENV === 'env' ? dbLocal : dbLocal;
        return {
          uri,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY', MongooseModule],
})
export class DatabaseModule {}
