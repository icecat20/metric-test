import { Module } from '@nestjs/common';
import { MetricController } from './controller/metric.controller';
import { MetricService } from './service/metric.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metric } from './entity/metric.entity';
import { MetricsRepository } from './repository/metric.repository';
import { MetricsValidate } from './validate/metric.validate';
import { Users } from './entity/users.entity';
import { MetricsHelper } from './helper/metric.helper';

@Module({
  imports: [TypeOrmModule.forFeature([Metric, Users])],
  controllers: [MetricController],
  providers: [MetricService, MetricsRepository, MetricsValidate, MetricsHelper],
})
export class MetricModule {}
