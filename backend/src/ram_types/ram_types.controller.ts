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
import { RamTypesService } from './ram_types.service';
import { CreateRamTypeDto } from './dto/create-ram_type.dto';
import { UpdateRamTypeDto } from './dto/update-ram_type.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/utils/guards/admin.guard';

@ApiTags('ram-types')
@Controller('ram-types')
export class RamTypesController {
  constructor(private readonly ramTypesService: RamTypesService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createRamTypeDto: CreateRamTypeDto) {
    return this.ramTypesService.create(createRamTypeDto);
  }

  @Get()
  findAll() {
    return this.ramTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ramTypesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateRamTypeDto: UpdateRamTypeDto) {
    return this.ramTypesService.update(+id, updateRamTypeDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.ramTypesService.remove(+id);
  }
}
