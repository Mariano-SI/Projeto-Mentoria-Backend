import { Sequelize } from 'sequelize';
import { singleton } from 'tsyringe';

@singleton()
export class DatabaseContext {
    private sequelize: Sequelize;

    private environment: any = process.env;


    constructor() {
        this.sequelize =  new Sequelize(this.environment.DATABASE_NAME, this.environment.DATABASE_USERNAME, this.environment.DATABASE_PASSWORD,{
            host: this.environment.DATABASE_HOST,
            port: this.environment.DATABASE_PORT,
            dialect:this.environment.DATABASE_DIALECT
        });
    }

    getSequelizeInstance(): Sequelize {
        return this.sequelize;
    }
}