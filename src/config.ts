import * as dotenv from 'dotenv';

dotenv.config();

const mysqlConfig = {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT
}

export const config = {
    mysql: mysqlConfig
}