import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './modules/products/controllers/products.controller';
import { UsersController } from './modules/users/controllers/users.controller';
import { ProductsService } from './modules/products/services/products.service';
import { UsersService } from './modules/users/services/users.service';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { config } from './config/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController, ProductsController, UsersController],
  providers: [AppService, ProductsService, UsersService],
})
export class AppModule {}
