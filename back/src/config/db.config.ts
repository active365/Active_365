import { registerAs } from '@nestjs/config';
import {config as dotenvConfig} from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({path: '.env'});
const config = {
    type: `${process.env.DB_TYPE}`as "mysql",
    database: `${process.env.DB_NAME}`,
    host: `${process.env.DB_HOST}`,
    port: +process.env.DB_PORT,
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    entities: [`dist/**/*.entity{.ts,.js}`],
    migrations: [`dist/**/migrations/*{.ts,.js}`],
    autoLoadEntities: true,
    // dropSchema: true,
    // synchronize: true,
};
export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);