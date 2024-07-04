import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const beetsDatabaseConfig: SequelizeModuleOptions = {
    dialect: 'sqlite',
    storage: process.env.BEETS_LIBRARY_DB,
    autoLoadModels: true,
    synchronize: false,
};