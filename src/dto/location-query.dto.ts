import { IsEnum, IsOptional } from 'class-validator';
import { Locations } from 'src/utils/locations.enum';

export class LocationQueryDto {
  @IsEnum(Locations)
  @IsOptional()
  local?: Locations;
}
