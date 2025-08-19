import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare const databaseConfig: TypeOrmModuleOptions;
export declare const connectionPoolConfig: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
    evict: number;
};
