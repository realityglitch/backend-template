import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { EnterpriseUser } from "./enterprise-user";

@Entity()
export class EnterpriseUserLogs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ipAddress: string;

  @CreateDateColumn()
  loginTime: Date;

  @ManyToOne(() => EnterpriseUser, (user) => user.logs)
  user: EnterpriseUser;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: true })
  logoutTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
