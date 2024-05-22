import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/utils/db/prisma.service';
import { CartsService } from 'src/carts/carts.service';
import { CustomBuildsModule } from 'src/custom_builds/custom_builds.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CartsService],
  imports: [forwardRef(() => CustomBuildsModule)],
  exports: [UsersService],
})
export class UsersModule {}
