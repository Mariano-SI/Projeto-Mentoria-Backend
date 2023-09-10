import 'reflect-metadata';
import ContestRepository from "./adapters/driven/adapter.database/repository/contestRepository"
import { UpdateContestInput } from "./core/domain/dtos/contests/updateContestInput"
import {Sequelize} from 'sequelize'
import { server } from "./infra/server/config";

import VoteRepository from "./adapters/driven/adapter.database/repository/votesRepository";
import { DatabaseContext } from "./adapters/driven/adapter.database/context/DatabaseContext";
import EnvironmentVariables from "./infra/environment/EnvironmentVariables";
server;


/*function app(){
    const teste = new ContestRepository( new Sequelize("mentoria-db", "Mariano", "m-88443244",{
        host: "mentoria-server.database.windows.net",
        port: 1433,
        dialect:"mssql"
    }))


  
    teste.selectAllContests().then((result)=> console.log(result))

}
app()*/