import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { ResponseModel } from '../../../utils/ResponseModel';
import { CreateProductDto } from '../dtos/products/create-product.dto';
import { UpdateProductDto } from '../dtos/products/update-product.dto';
import { ProductsService } from '../services/products.service';

interface IGetProducts {
  limit?: number;
  offset?: number;
  brand: string;
}
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  @HttpCode(HttpStatus.ACCEPTED)
  async getAll(@Query() query: IGetProducts) {
    const products = await this.productService.findAll();
    const res = new ResponseModel();
    res.setMessage('Productos');
    const data = res.send(products);
    return data;
  }

  @Get(':pId')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('pId', MongoIdPipe) pId: string) {
    const product = await this.productService.findOne(pId);
    const res = new ResponseModel();
    res.setMessage('Productos');
    const data = res.send(product);
    return data;
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    const data = await this.productService.create(body);
    const res = new ResponseModel();
    res.setMessage('Producto creado');
    return res.send(data);
  }
  @Put(':pId')
  async update(
    @Param('pId', MongoIdPipe) pId: string,
    @Body() body: UpdateProductDto,
  ) {
    const data = await this.productService.update(pId, body);
    const res = new ResponseModel();
    res.setMessage('Producto actualizado');
    return res.send(data);
  }

  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: string) {
    const data = await this.productService.remove(id);
    const res = new ResponseModel();
    res.setMessage('Producto eliminado');
    return res.send(data);
  }
}
