import { StringifyOptions } from 'querystring';
import { injectable, singleton } from 'tsyringe';

@injectable()
export class EnvironmentVariables {
  private environment: any = process.env;  
    environmentVariables: { databaseName: string; databaseUserName: string; databasePassword: string; databasePort: number; databaseHost: string; databaseDialect: StringifyOptions; };

    constructor() {
    console.log(this.environment.DATABASE_NAME);
    this.environmentVariables={
         databaseName : this.environment.DATABASE_NAME,
         databaseUserName : this.environment.DATABASE_USERNAME,
         databasePassword : this.environment.DATABASE_PASSWORD,
         databasePort: this.environment.DATABASE_PORT,
         databaseHost : this.environment.DATABASE_HOST,
         databaseDialect : this.environment.DATABASE_DIALECT,
    }
  }
}

export default EnvironmentVariables;