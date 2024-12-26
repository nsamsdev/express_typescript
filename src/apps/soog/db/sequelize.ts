

import { Sequelize, DataTypes, Op, Dialect } from 'sequelize';

const sequelizeSoog : any = new Sequelize(
  process.env.SOOG_DB_DATABASE as string,
  process.env.SOOG_DB_USER as string,
  process.env.SOOG_DB_PASS as string,
  {
    host: process.env.SOOG_DB_HOST,
    dialect: process.env.SOOG_DB_DRIVER as Dialect,
    logging: false,
    pool: {
      max: 15,
      min: 5,
      acquire: 30000,
      idle: 10000,
      evict: 15000,
    },
  }
);

export default sequelizeSoog;
