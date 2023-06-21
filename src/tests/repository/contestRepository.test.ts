import { Sequelize } from "sequelize";
import ContestRepository from "../../repository/contestRepository"
import { UpdateContestInput } from "../../domain/dtos/contests/updateContestInput";


jest.mock("sequelize",()=>{
    const mockSequelize = {
        query: jest.fn().mockReturnValueOnce([undefined,1]).mockReturnValueOnce([undefined,0]),
        close: jest.fn(),
    }
    const actualSequelize = jest.requireActual('sequelize')
    return{
        Sequelize: jest.fn(()=> mockSequelize)
    }
})
describe("contest repository", ()=>{
    
    it("updateContest success, should be update contest entity", async ()=>{
        

        const connection = new Sequelize("asdasf-adssd", "adsasd", "adsasfsaf",{
            host: "aaaaaaaaaaaaaaaaa",
            /* port: 1433, */
            dialect:"mssql"
        })
        
        const contestRepository = new ContestRepository(connection);
        jest.spyOn(contestRepository,'updateContest')
        const contest = new UpdateContestInput({id:"E99357FA-0C64-4DF1-99F8-B84DAF213908", active: false})

        await contestRepository.updateContest(contest)
        expect(connection.query).toHaveBeenCalledTimes(1);
        /* expect(contestRepository.updateContest).toHaveBeenCalledTimes(1) */
        /* const mockedUpdateContest = jest.fn(contestRepository.updateContest)

        await mockedUpdateContest(contest)
        expect(mockedUpdateContest).toHaveBeenCalledTimes(1)  */
    })

    it("updateContest failed, contest not exists", async ()=>{
        const connection = new Sequelize("asdasf-adssd", "adsasd", "adsasfsaf",{
            host: "aaaaaaaaaaaaaaaaa",
            /* port: 1433, */
            dialect:"mssql"
        })
        
        const contestRepository = new ContestRepository(connection);
        jest.spyOn(contestRepository,'updateContest')
        const contest = new UpdateContestInput({id:"E99357FA-0C64-4DF1-99F8-B84DAF213908", active: false})

        await expect(  ()=>{
             contestRepository.updateContest(contest).catch((error)=>{throw error} ) 

        }).toThrow(Error)

    })
   /*  it("Create a new contest", async ()=>{
        const connection = new Sequelize("mentoria-db", "Mariano", "m-88443244",{
            host: "mentoria-server.database.windows.net",
            port: 1433, 
            dialect:"mssql"
        })
        const contestRepository = new ContestRepository(connection);
         jest.spyOn(contestRepository,'updateContest')
        const contest = new UpdateContestInput({id:"E99357FA-0C64-4DF1-99F8-B84DAF213908", active: false}) 

        await contestRepository.createContest();
        expect(contestRepository.createContest).toHaveBeenCalledTimes(1)
        const mockedCreateContest = jest.fn(contestRepository.createContest)

        await mockedCreateContest()
        expect(mockedCreateContest).toHaveBeenCalledTimes(1) 
    }) */
})