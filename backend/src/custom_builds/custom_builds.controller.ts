import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomBuildsService } from './custom_builds.service';
import { CreateCustomBuildDto } from './dto/create-custom_build.dto';
import { UpdateCustomBuildDto } from './dto/update-custom_build.dto';
import { AdminGuard } from 'src/utils/guards/admin.guard';

@Controller('custom-builds')
export class CustomBuildsController {
  constructor(private readonly customBuildsService: CustomBuildsService) {}

  @Post()
  create(@Body() createCustomBuildDto: CreateCustomBuildDto) {
    return this.customBuildsService.create(createCustomBuildDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.customBuildsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customBuildsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomBuildDto: UpdateCustomBuildDto,
  ) {
    return this.customBuildsService.update(+id, updateCustomBuildDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customBuildsService.remove(+id);
  }

  @Post('build/:id')
  addToCart(@Param('id') id: string) {
    return this.customBuildsService.addToCart(+id);
  }
}
