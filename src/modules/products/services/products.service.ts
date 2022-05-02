import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dtos/products/create-product.dto';
import { UpdateProductDto } from '../dtos/products/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    const prod = await this.productModel.findById(id);
    console.log(prod);
    if (!prod) {
      throw new NotFoundException('No existe producto con ese id');
    }
    return prod;
  }

  create(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }

  async update(id: string, payload: UpdateProductDto) {
    const prod = await this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!prod) throw new NotFoundException(`Product #${id} not found`);

    return prod;
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id).exec();
  }
}
