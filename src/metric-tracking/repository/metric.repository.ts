import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metric } from '../entity/metric.entity';
import { Repository } from 'typeorm';
import { CreateMetricDto } from '../dto/create-matric.dto';
import { TYPE_METRIC } from '../enum/type.enum';
import { Users } from '../entity/users.entity';
import { GetChartMetricsDto } from '../dto/get-matric.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class MetricsRepository {
  constructor(
    @InjectRepository(Metric)
    private metricsRepository: Repository<Metric>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly logger: Logger,
  ) {}

  find(userId: string, type: TYPE_METRIC) {
    this.logger.log('find');
    try {
      return this.metricsRepository.find({
        where: {
          userId: userId,
          metricType: type.toString() as TYPE_METRIC,
        },
      });
    } catch (error) {
      this.logger.log('find', error);
      throw new InternalServerErrorException(error);
    }
  }

  create(payload: CreateMetricDto) {
    this.logger.log('create');
    try {
      return this.metricsRepository.save(payload);
    } catch (error) {
      this.logger.log('create', error);
      throw new InternalServerErrorException(error);
    }
  }

  findUserId(userId: string) {
    this.logger.log('findUserId');
    try {
      return this.usersRepository.findOne({ where: { id: userId } });
    } catch (error) {
      this.logger.log('findUserId', error);
      throw new InternalServerErrorException(error);
    }
  }

  async getChart(dto: GetChartMetricsDto) {
    this.logger.log('getChart');
    try {
      const metrics = await this.metricsRepository
        .createQueryBuilder('m')
        .where('m.userId = :user_id', { user_id: dto.userId })
        .andWhere('m.metricType = :metric', { metric: dto.metricType })
        .andWhere('m.date <= NOW()')
        .andWhere("m.date >= NOW() - INTERVAL '2 MONTH'")
        .getMany();

      return metrics;
    } catch (error) {
      this.logger.log('getChart', error);
      throw new InternalServerErrorException(error);
    }
  }
}
