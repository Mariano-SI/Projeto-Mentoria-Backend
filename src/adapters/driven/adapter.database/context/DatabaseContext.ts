import { Sequelize } from 'sequelize';
import { inject, singleton } from 'tsyringe';

@singleton()
export class DatabaseContext {
    private sequelize: Sequelize;

    private _environment;


    constructor(@inject('EnvironmentVariables') environment:any) {
        this._environment = environment;
        //console.log(this._environment)
        this.sequelize =  new Sequelize(this._environment.environmentVariables.databaseName, this._environment.environmentVariables.databaseUserName, this._environment.environmentVariables.databasePassword,{
            host: this._environment.environmentVariables.databaseHost,
            port: this._environment.environmentVariables.databasePort,
            dialect:this._environment.environmentVariables.databaseDialect
        });
    }

    getSequelizeInstance(): Sequelize {
        return this.sequelize;
    }
}