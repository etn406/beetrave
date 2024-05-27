import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const beetsDatabaseConfig: SequelizeModuleOptions = {
    dialect: 'sqlite',
    storage: 'beets-database/library.db',
    autoLoadModels: true,
    synchronize: false,
};