import { ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsIn,
  IsEnum,
} from 'class-validator';
import { TYPE_METRIC } from '../enum/type.enum';

export class CreateMetricDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  unit: string;

  @ApiProperty()
  @IsEnum(TYPE_METRIC)
  metricType: TYPE_METRIC;
}
