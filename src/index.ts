import ContestRepository from "./repository/contestRepository"
import { UpdateContestInput } from "./domain/dtos/contests/updateContestInput"
import {Sequelize} from 'sequelize'
function app(){
    const teste = new ContestRepository( new Sequelize("mentoria-db", "Mariano", "m-88443244",{
        host: "mentoria-server.database.windows.net",
        port: 1433,
        dialect:"mssql"
    }))


  
    const contest = new UpdateContestInput({id:"A7ADE82D-CF6B-4DBB-8562-7F70B288E498", active: false})
    teste.createContest()
}
app()