import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { config } from 'src/config/config';
import { ProductsService } from 'src/modules/products/services/products.service';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { UpdateUserDto } from '../dtos/users/update-user.dto';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  private users: User[] = [
    { id: '1', email: 'manu@mail', password: '123', role: 'admin' },
  ];

  create(createUserDto: CreateUserDto) {
    return this.configService.apiKey;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException('No existe usuario con ese id');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getOrderByUser(id: string): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productService.findAll(),
    };
  }
}
