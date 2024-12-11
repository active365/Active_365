import { PartialType } from '@nestjs/mapped-types';
import { CreateGymDto } from './create-gym.dto';

export class UpdateGymDto extends PartialType(CreateGymDto) {}
