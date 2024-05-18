import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRamTypeDto } from './dto/create-ram_type.dto';
import { UpdateRamTypeDto } from './dto/update-ram_type.dto';
import { PrismaService } from 'src/utils/db/prisma.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class RamTypesService {
  constructor(
    private db: PrismaService, 
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}
  async create(createRamTypeDto: CreateRamTypeDto) {
    const product = await this.productsService.findOne(createRamTypeDto.product_id);
    if (!product) {
      throw new NotFoundException('product_id указан неверно.');
    }
    return await this.db.ram_type.create({
      data: {
        ...createRamTypeDto,
      },
    });
  }

  async findAll() {
    return await this.db.ram_type.findMany();
  }

  async findOne(id: number) {
    const ram_type = await this.db.ram_type.findFirst({ where: { id } });
    if (!ram_type) {
      throw new NotFoundException('тип оперативной памяти не найден.');
    }

    return ram_type;
  }

  async findByProductId(id: number) {
    return await this.db.ram_type.findMany({ where: { product_id: id } });
  }

  async update(id: number, updateRamTypeDto: UpdateRamTypeDto) {
    await this.findOne(id);

    const product = await this.productsService.findOne(updateRamTypeDto.product_id);
    if (!product) {
      throw new NotFoundException('product_id указан неверно.');
    }
    return await this.db.ram_type.update({
      where: { id },
      data: {
        ...updateRamTypeDto,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.db.ram_type.delete({ where: { id } });
    return { message: 'тип оперативной памяти удален.' };
  }
}
