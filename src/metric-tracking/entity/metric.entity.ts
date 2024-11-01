import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TYPE_METRIC } from '../enum/type.enum';
import { Users } from './users.entity';

@Entity('metrics')
export class Metric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column('float')
  value: number;

  @Column()
  unit: string;

  @Column({ type: 'enum', default: TYPE_METRIC.DISTANCE, enum: TYPE_METRIC })
  metricType: TYPE_METRIC;

  @ManyToOne(() => Users, (user) => user.metrics)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
