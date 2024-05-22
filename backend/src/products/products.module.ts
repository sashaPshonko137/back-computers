import { Module, forwardRef } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/utils/db/prisma.service';
import { ImagesService } from 'src/images/images.service';
import { TypesService } from 'src/types/types.service';
import { UsersModule } from 'src/users/users.module';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, ImagesService, TypesService],
  exports: [ProductsService],
  imports: [forwardRef(() => UsersModule)],
})
export class ProductsModule {}
