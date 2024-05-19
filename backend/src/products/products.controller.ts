import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ImagesService } from 'src/images/images.service';
import { AdminGuard } from 'src/utils/guards/admin.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private imagesService: ImagesService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createProuctDto: CreateProductDto) {
    return this.productsService.create(createProuctDto);
  }

  @Get()
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'searchValue', required: false, type: String })
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 16,
    @Query('minPrice', ParseIntPipe) minPrice?: number,
    @Query('maxPrice', ParseIntPipe) maxPrice?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
    @Query('type') type?: string,
    @Query('searchValue') searchValue?: string,
  ) {
    return this.productsService.findAll(
      page,
      limit,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      type || undefined,
      searchValue || undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('build/:id')
  findByBuild(@Param('id') id: string, @Query('url') url: string) {
    return this.productsService.findByBuild(+id, url);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
