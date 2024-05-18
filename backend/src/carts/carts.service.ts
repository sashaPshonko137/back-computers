import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/utils/db/prisma.service';

@Injectable()
export class CartsService {
  constructor(private db: PrismaService) {}
  async create(createCartDto: CreateCartDto) {
    await this.db.carts.create({ data: { ...createCartDto } });
    return { message: 'Корзина создана.' };
  }

  async findAll(page: number = 1, limit: number = 16) {
    const offset = (page - 1) * limit;
    const totalCount = await this.db.carts.count();
    const carts = await this.db.carts.findMany({
      take: limit,
      skip: offset,
    });
    return { totalCount, carts };
  }

  async findOne(id: number) {
    const cart = await this.db.carts.findFirst({
      where: { user_id: id },
      include: {
        carts_products: {
          include: { product: { include: { image: true } } },
          orderBy: { id: 'asc' },
        },
      },
    });
    if (!cart) {
      throw new NotFoundException('id указан неверно.');
    }
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    await this.findOne(id);
    await this.db.carts.update({ where: { id }, data: { ...updateCartDto } });
    return { message: 'Корзина обновлена.' };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.db.carts.delete({ where: { id } });
    return { message: 'Корзина удалена.' };
  }

  async clear(id: number) {
    const cart = await this.db.carts.findFirst({ where: { user_id: id } });
    if (!cart) {
      throw new NotFoundException('id указан неправильно.');
    }
    return await this.db.carts_products.deleteMany({
      where: { cart_id: cart.id },
    });
  }
}
