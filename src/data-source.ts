import "reflect-metadata";
import { DataSource } from "typeorm";
import { EnterpriseUser as User } from "./entity/enterprise-user";
import { EnterpriseUserLogs } from "./entity/enterprise-user-logs";
import { PbmClients } from "./entity/pbm-clients";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DB_URL,
  synchronize: true,
  logging: false,
  entities: [User, EnterpriseUserLogs, PbmClients],
  migrations: [],
  subscribers: [],
});
