import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { EnterpriseUserLogs } from './enterprise-user-logs';

@Entity()
export class EnterpriseUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EnterpriseUserLogs, (userLogs) => userLogs.user, {
    nullable: true,
  })
  @JoinColumn()
  logs?: EnterpriseUserLogs[];
}
