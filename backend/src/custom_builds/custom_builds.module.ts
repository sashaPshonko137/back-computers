import { forwardRef, Module } from '@nestjs/common';
import { CustomBuildsService } from './custom_builds.service';
import { CustomBuildsController } from './custom_builds.controller';
import { PrismaService } from 'src/utils/db/prisma.service';
import { ImagesService } from 'src/images/images.service';
import { TypesService } from 'src/types/types.service';
import { CartsService } from 'src/carts/carts.service';
import { RamTypesService } from 'src/ram_types/ram_types.service';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CustomBuildsController],
  providers: [
    CustomBuildsService,
    PrismaService,
    ImagesService,
    TypesService,
    CartsService,
    RamTypesService,
  ],
  exports: [CustomBuildsService],
  imports: [forwardRef(() => ProductsModule), forwardRef(() => UsersModule)],
})
export class CustomBuildsModule {}
