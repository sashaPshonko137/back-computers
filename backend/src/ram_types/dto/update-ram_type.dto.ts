import { PartialType } from '@nestjs/swagger';
import { CreateRamTypeDto } from './create-ram_type.dto';

export class UpdateRamTypeDto extends PartialType(CreateRamTypeDto) {}
