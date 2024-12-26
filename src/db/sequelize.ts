

import { Sequelize, DataTypes, Op, Dialect } from 'sequelize';



const sequelizeGlobal : any = new Sequelize(
    process.env.GLOBAL_DB_DATABASE as string,
    process.env.GLOBAL_DB_USER as string,
    process.env.GLOBAL_DB_PASS, {
        host: process.env.GLOBAL_DB_HOST,
        dialect: process.env.GLOBAL_DB_DRIVER as Dialect,
        logging: false,
        pool : {
            max: 15,
            min: 5,
            acquire: 30000,
            idle: 10000,
            evict: 15000
        }
    }
);

export default sequelizeGlobal;