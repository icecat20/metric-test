import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMetricDto } from '../dto/create-matric.dto';
import { GetChartMetricsDto } from '../dto/get-matric.dto';
import { TYPE_METRIC, UNIT_DISTANCE, UNIT_TEMPER } from '../enum/type.enum';

@Injectable()
export class MetricsHelper {
  private conversionFactorsTemperatures;
  private conversionFactorDistances;

  constructor() {
    this.conversionFactorDistances = {
      [UNIT_DISTANCE.METER.toString()]: 1,
      [UNIT_DISTANCE.CENTIMETER.toString()]: 2,
      [UNIT_DISTANCE.FEET.toString()]: 3,
      [UNIT_DISTANCE.INCH.toString()]: 4,
      [UNIT_DISTANCE.YARN.toString()]: 5,
    };
    this.conversionFactorsTemperatures = {
      [UNIT_TEMPER.F.toString()]: 1,
      [UNIT_TEMPER.K.toString()]: 2,
      [UNIT_TEMPER.C.toString()]: 2,
    };
  }

  convertValueDistanceToMeter(value: number, toUnit: string) {
    return value * this.conversionFactorDistances[toUnit];
  }

  convertValueDistanceFromMeterToUnit(value: number, toUnit: string) {
    return value / this.conversionFactorDistances[toUnit];
  }

  convertValueTempToF(value: number, toUnit: string) {
    return value * this.conversionFactorsTemperatures[toUnit];
  }

  convertValueDistanceFromFToUnit(value: number, toUnit: string) {
    return value / this.conversionFactorsTemperatures[toUnit];
  }
}
