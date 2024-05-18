import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/utils/db/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ImagesService } from 'src/images/images.service';
import { TypesService } from 'src/types/types.service';
import { RamTypesService } from 'src/ram_types/ram_types.service';

@Injectable()
export class ProductsService {
  constructor(
    private db: PrismaService,
    private imagesService: ImagesService,
    private typesService: TypesService,
    @Inject(forwardRef(() => RamTypesService))
    private ramTypesService: RamTypesService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const image = await this.imagesService.findOne(createProductDto.image_id);
    if (!image) {
      throw new NotFoundException('Такого изображения не существует.');
    }
    const type = await this.typesService.findOne(createProductDto.type_id);
    if (!type) {
      throw new NotFoundException('Такой категории не существует.');
    }

    if (type.url === 'processor' && !createProductDto.socket) {
      throw new NotFoundException(
        'Необходимо указать тип сокета и тип оперативной памяти.',
      );
    }

    if (
      type.url === 'motherboard' &&
      (!createProductDto.socket ||
        !createProductDto.form_factor ||
        !createProductDto.ram_type ||
        !createProductDto.ram_capacity)
    ) {
      throw new NotFoundException(
        'Необходимо указать тип сокета, тип оперативной памяти, тип форм фактора и количество допустимых планок оперативной памяти.',
      );
    }

    if (type.url === 'cooling' && !createProductDto.socket) {
      throw new NotFoundException('Необходимо указать тип сокета.');
    }

    if (
      type.url === 'case' &&
      (!createProductDto.form_factor ||
        !createProductDto.gpu_width ||
        !createProductDto.gpu_height)
    ) {
      throw new NotFoundException(
        'Необходимо указать тип форм фактора, максимальную допустимую ширину видеокарты и максимальную допустимую длину видеокарты.',
      );
    }

    if (
      type.url === 'videocard' &&
      (!createProductDto.gpu_width || !createProductDto.gpu_height)
    ) {
      throw new NotFoundException(
        'Необходимо указать ширину видеокарты и длину видеокарты.',
      );
    }

    if (type.url === 'ram' && !createProductDto.ram_type) {
      throw new NotFoundException('Необходимо указать тип оперативной памяти.');
    }

    const { characteristics, ...productData } = createProductDto;

    const product = await this.db.products.create({
      data: {
        ...productData,
        characteristics: {
          create: characteristics?.map((char) => ({
            key: char.key,
            value: char.value,
            rowKey: char.rowKey,
          })),
        },
      },
    });
    return product;
  }

  async findAll(
    page: number = 1,
    limit: number = 16,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string,
    sortOrder?: string,
    type?: string,
    searchValue?: string,
  ) {
    const offset = (page - 1) * limit;
    const whereClause: any = { deleted: false };

    if (type) {
      whereClause.type = {
        url: type,
      };
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      whereClause.price = {
        gte: minPrice,
        lte: maxPrice,
      };
    }

    const orderBy = {};
    if (sortBy && sortOrder) {
      orderBy[sortBy] = sortOrder;
    }

    let totalCount = await this.db.products.count({
      where: whereClause,
    });

    if (searchValue) {
      whereClause.OR = [
        {
          name: {
            contains: searchValue,
            mode: 'insensitive',
          },
        },
      ];

      totalCount = await this.db.products.count({
        where: whereClause,
      });
    }

    const products = await this.db.products.findMany({
      where: whereClause,
      take: limit,
      skip: offset,
      orderBy,
      include: {
        image: true,
        type: true,
        characteristics: true,
      },
    });

    return { totalCount, products };
  }

  async findByBuild(id: number, url: string) {
     const build = await this.db.custom_builds.findFirst({ where: { id } });
     if (!build) {
       throw new NotFoundException('Сборка не найдена.');
     }
     
     const {
      processor_id,
      motherboard_id,
      videocard_id,
      ram_id,
      ram_quantity,
      powerblock_id,
      drive_id,
      case_id,
      cooling_id,
    } = build;
  
    const [
      processor,
      motherboard,
      videocard,
      ram,
      ram_types,
      powerblock,
      drive,
      case_product,
      cooling,
    ] = await Promise.all([
      processor_id && this.findOne(processor_id),
      motherboard_id &&this.findOne(motherboard_id),
      videocard_id && this.findOne(videocard_id),
      ram_id && this.findOne(ram_id),
      processor_id && this.ramTypesService.findByProductId(processor_id),
      powerblock_id && this.findOne(powerblock_id),
      drive_id && this.findOne(drive_id),
      case_id &&this.findOne(case_id),
      cooling_id && this.findOne(cooling_id),
    ]);

    
    switch (url) {
      case "processor":
        const processorType = await this.db.types.findFirst({ where: { url: "processor" } });
        const ram_types = await this.ramTypesService.findByProductId(processor_id);

        if (!motherboard_id && !cooling_id && !ram_id)
          return await this.db.products.findMany({
            where: { 
              deleted: false,  
              type_id: processorType.id,
            },
          });

        if (motherboard_id && !cooling_id && !ram_id)
          return await this.db.products.findMany({
            where: { 
              deleted: false,  
              type_id: processorType.id,
              socket: motherboard.socket
              
            },
          });

        if (motherboard_id && cooling_id && !ram_id)
          return await this.db.products.findMany({
            where: { 
              deleted: false,  
              type_id: processorType.id,
              socket: { 
                in: [motherboard.socket, cooling.socket]
              }
            },
          });

        if (motherboard_id && cooling_id && ram_id)
          return await this.db.products.findMany({
            where: { 
              deleted: false,  
              type_id: processorType.id,
              socket: { 
                in: [motherboard.socket, cooling.socket]
              },
              
            },
          });

        if (!motherboard_id && cooling_id && ram_id)
          return await this.db.products.findMany({
            where: { 
              deleted: false,  
              type_id: processorType.id,
              socket: cooling.socket,
              ram_type: ram_types[0].name || ram_types[1].name
            },
          });

        if (!motherboard_id && cooling_id && !ram_id)
          return await this.db.products.findMany({
            where: { 
              deleted: false,  
              type_id: processorType.id,
              socket: cooling.socket
            },
          });

        if (!motherboard_id && !cooling_id && ram_id)
          return await this.db.products.findMany({
            where: { 
              deleted: false,  
              type_id: processorType.id,
              ram_type: ram_types[0].name || ram_types[1].name
            },
          });

          if (motherboard_id && !cooling_id && ram_id) 
            return await this.db.products.findMany({
              where: { 
                deleted: false,  
                type_id: processorType.id,
                ram_type: ram_types[0].name || ram_types[1].name
              },
            });

        break;

        case "motherboard":
          const motherboardType = await this.db.types.findFirst({ where: { url: "processor" } });
        if (!processor_id && !cooling_id && !ram_id && !case_id)
          return await this.db.products.findMany({
            where: { 
              deleted: false,  
              type_id: motherboardType.id
            },
          });

        if (processor_id && !cooling_id && !ram_id && !case_id)
          return await this.db.products.findMany({
            where: { 
              deleted: false,  
              type_id: motherboardType.id,
              socket: processor.socket
            },
          });
    }

  }

  async findOne(id: number) {
    const product = await this.db.products.findFirst({
      where: { id },
      include: {
        characteristics: true,
        image: true,
        type: true,
      },
    });
    if (!product) {
      throw new NotFoundException('id указан неверно.');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const image = await this.imagesService.findOne(updateProductDto.image_id);
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('id указан неправильно.');
    }
    if (!image) {
      throw new NotFoundException('image указан неправильно.');
    }

    const type = await this.typesService.findOne(updateProductDto.type_id);
    if (!type) {
      throw new NotFoundException('Такой категории не существует.');
    }

    const { characteristics, ...productData } = updateProductDto;

    const updatedProduct = await this.db.products.update({
      where: { id },
      data: {
        ...productData,
        characteristics: {
          upsert: characteristics?.map((char) => ({
            where: { id: char.id || 0 },
            update: { key: char.key, value: char.value, rowKey: char.rowKey },
            create: { key: char.key, value: char.value, rowKey: char.rowKey },
          })),
        },
      },
      include: {
        characteristics: true,
      },
    });

    return updatedProduct;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('id указан неправильно.');
    }

    await this.db.products.update({
      where: { id },
      data: { deleted: true },
    });

    return { message: 'Товар удален.' };
  }
}
