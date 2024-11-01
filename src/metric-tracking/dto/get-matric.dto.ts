import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { TYPE_METRIC } from '../enum/type.enum';

export class GetChartMetricsDto {
  @ApiProperty()
  @IsEnum(TYPE_METRIC)
  metricType: TYPE_METRIC;

  @ApiProperty()
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
