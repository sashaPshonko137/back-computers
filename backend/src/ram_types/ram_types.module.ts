import { forwardRef, Module } from '@nestjs/common';
import { RamTypesService } from './ram_types.service';
import { RamTypesController } from './ram_types.controller';
import { PrismaService } from 'src/utils/db/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [forwardRef(() => ProductsModule)],
  controllers: [RamTypesController],
  providers: [RamTypesService, PrismaService],
  exports: [RamTypesService],
})
export class RamTypesModule {}
