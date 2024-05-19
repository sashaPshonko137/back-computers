import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PrismaService } from 'src/utils/db/prisma.service';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class TypesService {
  constructor(
    private db: PrismaService,
    private imagesService: ImagesService,
  ) {}
  async create(createTypeDto: CreateTypeDto) {
    const image = await this.imagesService.findOne(createTypeDto.image_id);
    const type = await this.findOneByUrl(createTypeDto.url);
    const typeByName = await this.findOneByName(createTypeDto.name);

    if (!image) {
      throw new NotFoundException('Такого изображения не существует.');
    }
    if (type) {
      throw new NotFoundException('Категория с таким url уже существует.');
    }
    if (typeByName) {
      throw new NotFoundException('Категория с таким именем уже существует.');
    }
    await this.db.types.create({ data: { ...createTypeDto } });
    return { message: 'Категория создана.' };
  }

  async findAll(page: number = 1, limit: number = 16) {
    const offset = (page - 1) * limit;
    const totalCount = await this.db.types.count({ where: { deleted: false } });
    const types = await this.db.types.findMany({
      where: { deleted: false },
      take: limit,
      skip: offset,
      include: {
        image: true,
      },
    });
    return { totalCount, types };
  }

  async findOne(id: number) {
    const type = await this.db.types.findFirst({ where: { id } });
    return type;
  }

  async findOneByUrl(url: string) {
    const type = await this.db.types.findFirst({ where: { url } });
    return type;
  }

  async findOneByName(name: string) {
    const type = await this.db.types.findFirst({ where: { name } });
    return type;
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    const type = await this.findOne(id);
    if (!type) {
      throw new NotFoundException('id указан неверно.');
    }

    if (updateTypeDto.url && updateTypeDto.url !== type.url) {
      const urlType = await this.findOneByUrl(updateTypeDto.url);
      if (urlType && urlType.id !== type.id) {
        throw new NotFoundException('Категория с таким url уже существует.');
      }
    }

    const image = await this.imagesService.findOne(updateTypeDto.image_id);
    if (!image) {
      throw new NotFoundException('Такого изображения не существует.');
    }

    await this.db.types.update({ where: { id }, data: { ...updateTypeDto } });
    return { message: 'Категория обновлена.' };
  }

  async remove(id: number) {
    const type = await this.findOne(id);

    if (!type) {
      throw new NotFoundException('id указан неверно.');
    }

    const hasProducts = await this.db.products.count({
      where: { type_id: id, deleted: false },
    });

    if (hasProducts) {
      throw new NotFoundException(
        'Категория используется в товарах и не может быть удалён.',
      );
    }
    // generate random integer between 0 and 9999
    const randomInt = Math.floor(Math.random() * 9999);
    const url = `${type.url}-${randomInt}-deleted`;
    const name = `${type.name}-${randomInt}-deleted`;

    await this.db.types.update({
      where: { id },
      data: { deleted: true, url: url, name: name },
    });

    return { message: 'Категория удалена.' };
  }
}
