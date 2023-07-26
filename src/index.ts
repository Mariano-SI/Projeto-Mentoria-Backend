import ContestRepository from "./repository/contestRepository"
import { UpdateContestInput } from "./domain/dtos/contests/updateContestInput"
import {Sequelize} from 'sequelize'
function app(){
    const teste = new ContestRepository( new Sequelize("mentoria-db", "Mariano", "m-88443244",{
        host: "mentoria-server.database.windows.net",
        port: 1433,
        dialect:"mssql"
    }))


  
    teste.selectAllContests().then((result)=> console.log(result))

}
app()