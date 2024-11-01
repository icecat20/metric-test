import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMetricDto } from '../dto/create-matric.dto';
import { GetChartMetricsDto } from '../dto/get-matric.dto';
import { TYPE_METRIC, UNIT_DISTANCE, UNIT_TEMPER } from '../enum/type.enum';

@Injectable()
export class MetricsValidate {
  constructor() {}

  validateCreate(createMetricDto: CreateMetricDto) {
    if (createMetricDto.metricType === TYPE_METRIC.DISTANCE.toString()) {
      const validDistanceUnits = [
        UNIT_DISTANCE.CENTIMETER,
        UNIT_DISTANCE.FEET,
        UNIT_DISTANCE.METER,
        UNIT_DISTANCE.INCH,
        UNIT_DISTANCE.YARN,
      ];
      if (!validDistanceUnits.includes(createMetricDto.unit as UNIT_DISTANCE)) {
        throw new BadRequestException(
          `Invalid unit  DISTANCE type: ${createMetricDto.unit}`,
        );
      }
    }
    if (createMetricDto.metricType === TYPE_METRIC.TEMPERATURE.toString()) {
      const validDistanceUnits = [UNIT_TEMPER.F, UNIT_TEMPER.C, UNIT_TEMPER.K];
      if (!validDistanceUnits.includes(createMetricDto.unit as UNIT_TEMPER)) {
        throw new BadRequestException(
          `Invalid unit TEMPER type: ${createMetricDto.unit}`,
        );
      }
    }
    return;
  }

  validateListMetric(metricType: TYPE_METRIC) {
    const validMetricType = [TYPE_METRIC.DISTANCE, TYPE_METRIC.TEMPERATURE];
    if (!validMetricType.includes(metricType as TYPE_METRIC)) {
      throw new BadRequestException(`Invalid TYPE_METRIC type: ${metricType}`);
    }
    return;
  }

  validateChartMetric(dto: GetChartMetricsDto): GetChartMetricsDto {
    if (dto.metricType === TYPE_METRIC.DISTANCE.toString()) {
      const validDistanceUnits = [
        UNIT_DISTANCE.CENTIMETER,
        UNIT_DISTANCE.FEET,
        UNIT_DISTANCE.METER,
        UNIT_DISTANCE.INCH,
        UNIT_DISTANCE.YARN,
      ];
      if (!validDistanceUnits.includes(dto.unit as UNIT_DISTANCE)) {
        console.log('validDistanceUnits', dto.unit);
        dto.unit = UNIT_DISTANCE.CENTIMETER;
      }
    }
    if (dto.metricType === TYPE_METRIC.TEMPERATURE.toString()) {
      const validDistanceUnits = [UNIT_TEMPER.F, UNIT_TEMPER.C, UNIT_TEMPER.K];
      if (!validDistanceUnits.includes(dto.unit as UNIT_TEMPER)) {
        dto.unit = UNIT_TEMPER.F;
      }
    }
    return dto;
  }
}
