import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomBuildDto } from './dto/create-custom_build.dto';
import { UpdateCustomBuildDto } from './dto/update-custom_build.dto';
import { PrismaService } from 'src/utils/db/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { RamTypesService } from 'src/ram_types/ram_types.service';

@Injectable()
export class CustomBuildsService {
  constructor(private db: PrismaService, private productsService: ProductsService, private usersSerice: UsersService, private ramTypesService: RamTypesService) {}
  async create(createCustomBuildDto: CreateCustomBuildDto) {

    const user = await this.usersSerice.findOne(createCustomBuildDto.user_id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
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
    } = createCustomBuildDto;
  
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
      processor_id && this.productsService.findOne(processor_id),
      motherboard_id &&this.productsService.findOne(motherboard_id),
      videocard_id && this.productsService.findOne(videocard_id),
      ram_id && this.productsService.findOne(ram_id),
      processor_id && this.ramTypesService.findByProductId(processor_id),
      powerblock_id && this.productsService.findOne(powerblock_id),
      drive_id && this.productsService.findOne(drive_id),
      case_id &&this.productsService.findOne(case_id),
      cooling_id && this.productsService.findOne(cooling_id),
    ]);

    if (processor && processor.socket && motherboard &&  motherboard.socket && processor.socket !== motherboard.socket) {
      throw new BadRequestException('Сокеты процессора и материнской платы не совпадают!');
    }

    if (motherboard && motherboard.socket && cooling && cooling.socket && motherboard.socket !== cooling.socket) {
      throw new BadRequestException('Сокеты системы охлаждения процессора и материнской платы не совпадают!');
    }

    if (cooling && cooling.socket && processor && processor.socket && cooling.socket !== processor.socket) {
      throw new BadRequestException('Сокеты системы охлаждения процессора и процессора не совпадают!');
    }

    if (ram_types && ram && ram.ram_type && !ram_types.some((ram_type) => ram_type.name === ram.ram_type) || !ram_types) {
      throw new BadRequestException('Процессор не совместим с типом оперативной памяти!');
    }

    if (ram_types && motherboard && motherboard.ram_type && !ram_types.some((ram_type) => ram_type.name === motherboard.ram_type) || !ram_types) {
      throw new BadRequestException('Материнская плата не совместима с типом оперативной памяти процессора!');
    }

    if (ram && ram.ram_type && motherboard && motherboard.ram_type && ram.ram_type !== motherboard.ram_type) {
      throw new BadRequestException('Материнская плата не совместима с типом оперативной памяти!');
    }

    if (motherboard && motherboard.form_factor && case_product && case_product.form_factor && motherboard.form_factor !== case_product.form_factor) {
      throw new BadRequestException('Форм фактор материнской платы не совпадает с форм фактором корпуса!');
    }

    if (videocard && videocard.gpu_height && case_product && case_product.gpu_height && videocard.gpu_height > case_product.gpu_height) {
      throw new BadRequestException('Длина видеокарты слишком большая!');
    }

    if (videocard && videocard.gpu_width && case_product && case_product.gpu_width && videocard.gpu_width > case_product.gpu_width) {
      throw new BadRequestException('Ширина видеокарты слишком большая!');
    }

    if (motherboard && motherboard.ram_capacity && ram_quantity && ram_quantity > motherboard.ram_capacity) {
      throw new BadRequestException('Количество планок оперативной памяти больше, чем слотов в материнской плате!');
    }
    
    const build = await this.db.custom_builds.create({
      data: {
        ...createCustomBuildDto,
      },
    });
    return build;
  }

  async findAll() {
    return await this.db.custom_builds.findMany();
  }

  async findOne(id: number) {
    const build = await this.db.custom_builds.findFirst({ where: { id } });
    if (!build) {
      throw new NotFoundException('Сборка не найдена.');
    }
    return build;
  }

  async update(id: number, updateCustomBuildDto: UpdateCustomBuildDto) {
    await this.findOne(id);

    const user = await this.usersSerice.findOne(updateCustomBuildDto.user_id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
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
    } = updateCustomBuildDto;
  
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
      this.productsService.findOne(processor_id),
      this.productsService.findOne(motherboard_id),
      this.productsService.findOne(videocard_id),
      this.productsService.findOne(ram_id),
      this.db.ram_type.findMany({ where: { product_id: processor_id } }),
      this.productsService.findOne(powerblock_id),
      this.productsService.findOne(drive_id),
      this.productsService.findOne(case_id),
      this.productsService.findOne(cooling_id),
    ]);

    if (processor && processor.socket && motherboard &&  motherboard.socket && processor.socket !== motherboard.socket) {
      throw new BadRequestException('Сокеты процессора и материнской платы не совпадают!');
    }

    if (motherboard && motherboard.socket && cooling && cooling.socket && motherboard.socket !== cooling.socket) {
      throw new BadRequestException('Сокеты системы охлаждения процессора и материнской платы не совпадают!');
    }

    if (cooling && cooling.socket && processor && processor.socket && cooling.socket !== processor.socket) {
      throw new BadRequestException('Сокеты системы охлаждения процессора и процессора не совпадают!');
    }

    if (ram_types && ram && ram.ram_type && !ram_types.some((ram_type) => ram_type.name === ram.ram_type) || !ram_types) {
      throw new BadRequestException('Процессор не совместим с типом оперативной памяти!');
    }

    if (ram_types && motherboard && motherboard.ram_type && !ram_types.some((ram_type) => ram_type.name === motherboard.ram_type) || !ram_types) {
      throw new BadRequestException('Материнская плата не совместима с типом оперативной памяти процессора!');
    }

    if (ram && ram.ram_type && motherboard && motherboard.ram_type && ram.ram_type !== motherboard.ram_type) {
      throw new BadRequestException('Материнская плата не совместима с типом оперативной памяти!');
    }

    if (motherboard && motherboard.form_factor && case_product && case_product.form_factor && motherboard.form_factor !== case_product.form_factor) {
      throw new BadRequestException('Форм фактор материнской платы не совпадает с форм фактором корпуса!');
    }

    if (videocard && videocard.gpu_height && case_product && case_product.gpu_height && videocard.gpu_height > case_product.gpu_height) {
      throw new BadRequestException('Длина видеокарты слишком большая!');
    }

    if (videocard && videocard.gpu_width && case_product && case_product.gpu_width && videocard.gpu_width > case_product.gpu_width) {
      throw new BadRequestException('Ширина видеокарты слишком большая!');
    }

    if (motherboard && motherboard.ram_capacity && ram_quantity && ram_quantity > motherboard.ram_capacity) {
      throw new BadRequestException('Количество планок оперативной памяти больше, чем слотов в материнской плате!');
    }

    return await this.db.custom_builds.update({
      where: { id },
      data: updateCustomBuildDto,
    });
  }

  async remove(id: number) {
    const build = await this.findOne(id);
    if (!build) {
      throw new NotFoundException('Сборка не найдена.');
    }
    await this.db.custom_builds.delete({ where: { id } });
    return { message: 'Сборка удалена.' };
  }
}
