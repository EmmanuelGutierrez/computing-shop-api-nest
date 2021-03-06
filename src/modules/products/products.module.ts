import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { Product, ProductSchema } from './entities/product.entity';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],

  exports: [ProductsService],
})
export class ProductsModule {}
