import { Module } from '@nestjs/common';
import { MetricModule } from './metric-tracking/metric-tracking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database.config';
import { LoggerModule } from './logger/logger.module';
import { ConfigCommonModule } from './config';

@Module({
  imports: [
    ConfigCommonModule,
    MetricModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
