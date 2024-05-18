import { PartialType } from '@nestjs/swagger';
import { CreateCustomBuildDto } from './create-custom_build.dto';

export class UpdateCustomBuildDto extends PartialType(CreateCustomBuildDto) {}
