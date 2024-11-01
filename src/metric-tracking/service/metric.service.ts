import { Injectable, NotFoundException } from '@nestjs/common';
import { MetricsRepository } from '../repository/metric.repository';
import { Metric } from '../entity/metric.entity';
import { CreateMetricDto } from '../dto/create-matric.dto';
import { MetricsValidate } from '../validate/metric.validate';
import { TYPE_METRIC, UNIT_DISTANCE, UNIT_TEMPER } from '../enum/type.enum';
import { GetChartMetricsDto } from '../dto/get-matric.dto';
import { MetricsHelper } from '../helper/metric.helper';
import { Logger } from 'nestjs-pino';

@Injectable()
export class MetricService {
  constructor(
    private readonly metricsRepository: MetricsRepository,
    private readonly metricsValidate: MetricsValidate,
    private readonly metricsHelp: MetricsHelper,
    private readonly logger: Logger,
  ) {}
  async getListMetric(userId: string, type: TYPE_METRIC): Promise<Metric[]> {
    this.logger.log('getListMetric');
    this.metricsValidate.validateListMetric(type);
    const user = await this.metricsRepository.findUserId(userId);
    console.log(user);
    if (!user) {
      throw new NotFoundException(`User id not found`);
    }
    const list = await this.metricsRepository.find(userId, type);
    const listMapper = list.map((metric) => {
      if (metric.metricType === TYPE_METRIC.DISTANCE.toString()) {
        const value = this.metricsHelp.convertValueDistanceFromMeterToUnit(
          metric.value,
          metric.unit,
        );
        return {
          ...metric,
          value: value,
        };
      }
      if (metric.metricType === TYPE_METRIC.TEMPERATURE.toString()) {
        const value = this.metricsHelp.convertValueDistanceFromFToUnit(
          metric.value,
          metric.unit,
        );
        return {
          ...metric,
          value: value,
        };
      }
    });
    return listMapper;
  }

  async create(payload: CreateMetricDto) {
    this.logger.log('create');
    this.metricsValidate.validateCreate(payload);
    if (payload.metricType === TYPE_METRIC.DISTANCE.toString()) {
      const value = this.metricsHelp.convertValueDistanceToMeter(
        payload.value,
        payload.unit,
      );
      payload.value = value;
      payload.unit = UNIT_DISTANCE.CENTIMETER;
    }
    if (payload.metricType === TYPE_METRIC.TEMPERATURE.toString()) {
      const value = this.metricsHelp.convertValueTempToF(
        payload.value,
        payload.unit,
      );
      payload.value = value;
      payload.unit = UNIT_TEMPER.F;
    }
    return this.metricsRepository.create(payload);
  }

  async getChart(dto: GetChartMetricsDto) {
    this.logger.log('getChart');
    const payload = this.metricsValidate.validateChartMetric(dto);
    const user = await this.metricsRepository.findUserId(payload.userId);
    if (!user) {
      throw new NotFoundException(`User id not found`);
    }
    const listChart = await this.metricsRepository.getChart(dto);
    const listChartMapped = listChart.map((metric) => {
      if (metric.metricType === TYPE_METRIC.DISTANCE.toString()) {
        const value = this.metricsHelp.convertValueDistanceFromMeterToUnit(
          metric.value,
          dto.unit,
        );
        return {
          ...metric,
          value: value,
          unit: dto.unit,
        };
      }
      if (metric.metricType === TYPE_METRIC.TEMPERATURE.toString()) {
        const value = this.metricsHelp.convertValueDistanceFromFToUnit(
          metric.value,
          dto.unit,
        );
        return {
          ...metric,
          value: value,
          unit: dto.unit,
        };
      }
    });
    return listChartMapped;
  }
}
