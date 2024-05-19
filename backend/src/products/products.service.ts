import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/utils/db/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ImagesService } from 'src/images/images.service';
import { TypesService } from 'src/types/types.service';
import { RamTypesService } from 'src/ram_types/ram_types.service';
import { Prisma } from '@prisma/client';

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

    const { characteristics, ram_type, ...productData } = createProductDto;

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
        ram_types: {
          create: ram_type?.map((ram) => ({
            name: ram.name,
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
      powerblock,
      drive,
      case_product,
      cooling,
    ] = await Promise.all([
      processor_id &&
        this.db.products.findFirst({
          where: {
            id: processor_id,
            type: { url: 'processor' },
            deleted: false,
          },
          select: { socket: true, ram_types: true },
        }),
      motherboard_id &&
        this.db.products.findFirst({
          where: {
            id: motherboard_id,
            type: { url: 'motherboard' },
            deleted: false,
          },
          select: {
            socket: true,
            ram_types: true,
            form_factor: true,
            ram_capacity: true,
          },
        }),
      videocard_id &&
        this.db.products.findFirst({
          where: {
            id: videocard_id,
            type: { url: 'videocard' },
            deleted: false,
          },
        }),
      ram_id &&
        this.db.products.findFirst({
          where: { id: ram_id, type: { url: 'ram' }, deleted: false },
          select: { ram_types: true },
        }),
      powerblock_id &&
        this.db.products.findFirst({
          where: {
            id: powerblock_id,
            type: { url: 'powerblock' },
            deleted: false,
          },
        }),
      drive_id &&
        this.db.products.findFirst({
          where: { id: drive_id, type: { url: 'drive' }, deleted: false },
        }),
      case_id &&
        this.db.products.findFirst({
          where: { id: case_id, type: { url: 'case' }, deleted: false },
          select: { form_factor: true, gpu_height: true, gpu_width: true },
        }),
      cooling_id &&
        this.db.products.findFirst({
          where: { id: cooling_id, type: { url: 'cooling' }, deleted: false },
          select: { socket: true },
        }),
    ]);

    switch (url) {
      case 'processor':
        const processorWhere: Prisma.productsWhereInput = {
          deleted: false,
          type: {
            url: 'processor',
          },
        };
        if (motherboard_id) {
          processorWhere.socket = motherboard.socket;
          processorWhere.ram_types = {
            some: {
              name:
                motherboard.ram_types[0].name || motherboard.ram_types[1].name,
            },
          };
        }
        if (cooling_id) {
          processorWhere.socket = {
            in: [...(processor_id ? [processor.socket] : []), cooling.socket],
          };
        }
        if (ram_id) {
          processorWhere.ram_types = {
            some: {
              name: ram.ram_types[0].name,
            },
          };
        }
        console.log(processorWhere);
        return await this.db.products.findMany({
          where: processorWhere,
        });

      case 'motherboard':
        const motherboardWhere: Prisma.productsWhereInput = {
          deleted: false,
          type: {
            url: 'motherboard',
          },
        };
        if (processor_id) {
          motherboardWhere.socket = processor.socket;
        }
        if (cooling_id) {
          motherboardWhere.socket = {
            in: [...(processor_id ? [processor.socket] : []), cooling.socket],
          };
        }
        if (ram_id) {
          if (motherboard.ram_capacity < build.ram_quantity) {
            throw new BadRequestException(
              'Количество планок оперативной памяти не может быть больше чем количество слотов оперативной памяти в материнской плате.');
          }
          motherboardWhere.ram_types = {
            some: {
              name: ram.ram_types[0].name,
            },
          };
        }
        if (case_id) {
          motherboardWhere.form_factor = case_product.form_factor;
        }
        return await this.db.products.findMany({
          where: motherboardWhere,
        });

      case 'videocard':
        const videocardWhere: Prisma.productsWhereInput = {
          deleted: false,
          type: {
            url: 'videocard',
          },
        };
        // if (motherboard_id) {
        //   videocardWhere.form_factor = motherboard.form_factor;
        // }
        if (case_id) {
          videocardWhere.gpu_height = {
            lte: case_product.gpu_height,
          };
          videocardWhere.gpu_width = {
            lte: case_product.gpu_width,
          };
        }
        return await this.db.products.findMany({
          where: videocardWhere,
        });
      case 'ram':
        const ramWhere: Prisma.productsWhereInput = {
          deleted: false,
          type: {
            url: 'ram',
          },
        };
        if (motherboard_id) {
          ramWhere.ram_types = {
            some: {
              name:
                motherboard.ram_types[0].name || motherboard.ram_types[1].name,
            },
          };
        }
        return await this.db.products.findMany({
          where: ramWhere,
        });

      case 'powerblock':
        const powerblockWhere: Prisma.productsWhereInput = {
          deleted: false,
          type: {
            url: 'powerblock',
          },
        };
        return await this.db.products.findMany({
          where: powerblockWhere,
        });

      case 'drive':
        const driveWhere: Prisma.productsWhereInput = {
          deleted: false,
          type: {
            url: 'drive',
          },
        };
        return await this.db.products.findMany({
          where: driveWhere,
        });

      case 'case':
        const caseWhere: Prisma.productsWhereInput = {
          deleted: false,
          type: {
            url: 'case',
          },
        };
        if (motherboard_id) {
          caseWhere.form_factor = motherboard.form_factor;
        }
        if (videocard_id) {
          caseWhere.gpu_height = {
            lte: videocard.gpu_height,
          };
          caseWhere.gpu_width = {
            lte: videocard.gpu_width,
          };
        }
        return await this.db.products.findMany({
          where: caseWhere,
        });

      case 'cooling':
        const coolingWhere: Prisma.productsWhereInput = {
          deleted: false,
          type: {
            url: 'cooling',
          },
        };
        if (processor_id) {
          coolingWhere.socket = processor.socket;
        }
        if (motherboard_id) {
          coolingWhere.socket = motherboard.socket;
        }
        return await this.db.products.findMany({
          where: coolingWhere,
        });
      default:
        throw new NotFoundException('Такой категории не существует.');
    }
  }

  async findOne(id: number) {
    const product = await this.db.products.findFirst({
      where: { id },
      include: {
        characteristics: true,
        image: true,
        type: true,
        ram_types: true,
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
