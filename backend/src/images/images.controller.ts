import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  UseGuards,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/images/storage';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/utils/guards/admin.guard';
@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.imagesService.create(file);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: number) {
    return this.imagesService.remove(id);
  }
}
