import { Sequelize } from "sequelize";
import ContestRepository from "../../repository/contestRepository"
import { UpdateContestInput } from "../../domain/dtos/contests/updateContestInput";

describe("contest repository", ()=>{
    it("updateContest success, should be update contest entity", async ()=>{
        const connection = new Sequelize("mentoria_votes_db", "sa", "SqlServer201912345",{
            host: "localhost",
            port: 1433,
            dialect:"mssql"
        })
        const contestRepository = new ContestRepository(connection);
        jest.spyOn(contestRepository,'updateContest')
        const contest = new UpdateContestInput({id:"A7ADE82D-CF6B-4DBB-8562-7F70B288E498", active: true})


        
        
        
        await contestRepository.updateContest(contest)
        expect(contestRepository.updateContest).toHaveBeenCalledTimes(1)
        /* const mockedUpdateContest = jest.fn(contestRepository.updateContest)
        
        
        await mockedUpdateContest(contest)
        expect(mockedUpdateContest).toHaveBeenCalledTimes(1) */
    })
})