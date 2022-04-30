import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ResponseModel } from 'src/utils/responseModel';
import { CreateProductDto } from '../dtos/products/create-product.dto';
import { UpdateProductDto } from '../dtos/products/update-product.dto';
import { ProductsService } from '../services/products.service';

interface IGetProducts {
  limit?: number;
  offset?: number;
  brand: string;
}

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getAll(@Query() query: IGetProducts) {
    const products = this.productService.findAll();
    const res = new ResponseModel();
    res.setMessage('Productos');
    const data = res.send(products);
    return data;
  }

  @Get(':pId')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('pId') pId: string) {
    const product = this.productService.findOne(pId);
    const res = new ResponseModel();
    res.setMessage('Productos');
    const data = res.send(product);
    return data;
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    const data = this.productService.create(body);
    const res = new ResponseModel();
    res.setMessage('Producto creado');
    return res.send(data);
  }
  @Put(':pId')
  update(@Param('pId') pId: string, @Body() body: UpdateProductDto) {
    const data = this.productService.update(pId, body);
    const res = new ResponseModel();
    res.setMessage('Producto actualizado');
    return res.send(data);
  }
}
