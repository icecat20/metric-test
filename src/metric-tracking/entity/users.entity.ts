import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TYPE_METRIC } from '../enum/type.enum';
import { Metric } from './metric.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Metric, (metric) => metric.user)
  metrics: Metric[];
}
