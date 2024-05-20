import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/utils/db/prisma.service';
import { CartsService } from 'src/carts/carts.service';


@Injectable()
export class UsersService {
  constructor(
    private db: PrismaService,
    private cartsService: CartsService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.db.users.create({ data: { ...createUserDto } });
    await this.cartsService.create({ user_id: user.id });
    await this.db.custom_builds.create({ data: { user_id: user.id } });
    return user;
  }

  async findAll(page: number = 1, limit: number = 16) {
    const offset = (page - 1) * limit;
    const totalCount = await this.db.users.count({ where: { deleted: false } });
    const users = await this.db.users.findMany({
      select: {
        hash: false,
        salt: false,
        id: true,
        email: true,
        surname: true,
        name: true,
        lastname: true,
        role: true,
      },
      where: { deleted: false },
      take: limit,
      skip: offset,
    });
    return { totalCount, users };
  }

  async findOne(id: number) {
    const user = await this.db.users.findFirst({
      select: {
        hash: false,
        salt: false,
        id: true,
        email: true,
        surname: true,
        name: true,
        lastname: true,
        role: true,
      },
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('id указан неверно.');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.db.users.findFirst({ where: { email } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('id указан неправильно.');
    }
    await this.db.users.update({ where: { id }, data: { ...updateUserDto } });
    return { message: 'Пользователь обновлен.' };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('id указан неправильно.');
    }

    const cart = await this.db.carts.findFirst({ where: { user_id: id } });
    if (cart)
      await this.db.carts_products.deleteMany({ where: { cart_id: cart.id } });

    await this.db.users.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });

    return { message: 'Пользователь удален.' };
  }
}
