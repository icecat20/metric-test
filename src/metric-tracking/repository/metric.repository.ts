import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metric } from '../entity/metric.entity';
import { Repository } from 'typeorm';
import { CreateMetricDto } from '../dto/create-matric.dto';
import { TYPE_METRIC } from '../enum/type.enum';
import { Users } from '../entity/users.entity';
import { GetChartMetricsDto } from '../dto/get-matric.dto';

@Injectable()
export class MetricsRepository {
  constructor(
    @InjectRepository(Metric)
    private metricsRepository: Repository<Metric>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  find(userId: string, type: TYPE_METRIC) {
    return this.metricsRepository.find({
      where: {
        userId: userId,
        metricType: type.toString() as TYPE_METRIC,
      },
    });
  }

  create(payload: CreateMetricDto) {
    return this.metricsRepository.save(payload);
  }

  findUserId(userId: string) {
    return this.usersRepository.find({ where: { id: userId } });
  }

  async getChart(dto: GetChartMetricsDto) {
    const metrics = await this.metricsRepository
      .createQueryBuilder('m')
      .where('m.userId = :user_id', { user_id: dto.userId })
      .andWhere('m.metricType = :metric', { metric: dto.metricType })
      .andWhere('m.date <= NOW()')
      .andWhere("m.date >= NOW() - INTERVAL '2 MONTH'")
      .getMany();

    return metrics;
  }
}
