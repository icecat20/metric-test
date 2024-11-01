import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MetricService } from '../service/metric.service';
import { CreateMetricDto } from '../dto/create-matric.dto';
import { ApiBody } from '@nestjs/swagger';
import { TYPE_METRIC } from '../enum/type.enum';
import { GetChartMetricsDto } from '../dto/get-matric.dto';
import { Logger } from 'nestjs-pino';

@Controller('metrics')
export class MetricController {
  constructor(
    private readonly metricService: MetricService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiBody({ type: CreateMetricDto })
  async create(@Body() payload: CreateMetricDto) {
    this.logger.log('create');
    return this.metricService.create(payload);
  }

  @Get('list')
  async findAll(
    @Query('userId') userId: string,
    @Query('metricType') metricType: TYPE_METRIC,
  ) {
    this.logger.log('list');
    return this.metricService.getListMetric(userId, metricType);
  }

  @Get('chart-data')
  async getChartData(@Query() dto: GetChartMetricsDto) {
    this.logger.log('getChartData');
    return this.metricService.getChart(dto);
  }
}
