import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MetricService } from '../service/metric.service';
import { CreateMetricDto } from '../dto/create-matric.dto';
import { ApiBody } from '@nestjs/swagger';
import { TYPE_METRIC } from '../enum/type.enum';
import { GetChartMetricsDto } from '../dto/get-matric.dto';

@Controller('metrics')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Post()
  @ApiBody({ type: CreateMetricDto })
  async create(@Body() payload: CreateMetricDto) {
    return this.metricService.create(payload);
  }

  @Get('list')
  async findAll(
    @Query('userId') userId: string,
    @Query('metricType') metricType: TYPE_METRIC,
  ) {
    return this.metricService.getListMetric(userId, metricType);
  }

  @Get('chart-data')
  async getChartData(@Query() dto: GetChartMetricsDto) {
    return this.metricService.getChart(dto);
  }
}
