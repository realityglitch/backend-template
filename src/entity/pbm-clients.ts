import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
// import { EnterpriseUserLogs } from "./enterprise-user-logs";

@Entity()
export class PbmClients extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 16 })
  prefix: string;

  @Column()
  active: boolean;

  @Column({ type: 'varchar', length: 2 })
  col1: string;

  @Column({ type: 'varchar', length: 2 })
  col2: string;

  @Column({ type: 'varchar', length: 2 })
  col3: string;

  @Column({ type: 'varchar', length: 2 })
  col4: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column()
  modifiedBy: string;

  @CreateDateColumn()
  modifiedOn: Date;
}
