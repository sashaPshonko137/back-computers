import { Module } from '@nestjs/common';
import { PrismaService } from './utils/db/prisma.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypesModule } from './types/types.module';
import { ImagesModule } from './images/images.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { CartsProductsModule } from './carts_products/carts_products.module';
import { AuthModule } from './auth/auth.module';
import { PasswordService } from './utils/password/password.service';
import { CookieService } from './utils/cookie/cookie.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './utils/mailer/mailer';
import { CustomBuildsModule } from './custom_builds/custom_builds.module';
import { RamTypesModule } from './ram_types/ram_types.module';
import { ProductsService } from './products/products.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    ProductsModule,
    TypesModule,
    ImagesModule,
    CartsModule,
    OrdersModule,
    CartsProductsModule,
    AuthModule,
    CustomBuildsModule,
    RamTypesModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    MailService,
    PasswordService,
    CookieService,
    JwtService,
  ],
})
export class AppModule {}
