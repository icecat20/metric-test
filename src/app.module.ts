import { Module } from '@nestjs/common';
import { MetricModule } from './metric-tracking/metric-tracking.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MetricModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'metric',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
