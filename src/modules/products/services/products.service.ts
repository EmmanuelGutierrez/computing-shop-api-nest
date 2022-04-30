import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/products/create-product.dto';
import { UpdateProductDto } from '../dtos/products/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 'asd',
      description: 'descr',
      image: 'url',
      price: 123,
      stock: 2,
      title: 'produ',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const prod = this.products.find((item) => item.id === id);
    if (!prod) {
      throw new NotFoundException('No existe producto con ese id');
    }
    return prod;
  }
  create(payload: CreateProductDto) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId.toString(),
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, payload: UpdateProductDto) {
    const prod = this.findOne(id);
    if (prod) {
      const index = this.products.findIndex((item) => item.id === id);
      const updateProduct = {
        ...prod,
        ...payload,
      };
      this.products[index] = updateProduct;
    }

    return null;
  }
}
