import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/utils/db/prisma.service';
import { ImagesService } from 'src/images/images.service';
import { TypesService } from 'src/types/types.service';
import { UsersModule } from 'src/users/users.module';
import { ProductsService } from './products.service';
import { RamTypesModule } from 'src/ram_types/ram_types.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, ImagesService, TypesService],
  exports: [ProductsService],
  imports: [UsersModule, forwardRef(() => RamTypesModule)],
})
export class ProductsModule {}
