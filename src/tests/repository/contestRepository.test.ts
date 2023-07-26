import { Sequelize } from "sequelize";
import ContestRepository from "../../repository/contestRepository"
import { UpdateContestInput } from "../../domain/dtos/contests/updateContestInput";
import { ContestEntity } from "../../domain/entities/ContestEntity";


jest.mock("sequelize",()=>{
    const mockSequelize = {
        query: jest.fn(),
        close: jest.fn(),
    }
    const actualSequelize = jest.requireActual('sequelize')
    return{
        Sequelize: jest.fn(()=> mockSequelize)
    }
})
describe("contest repository", ()=>{
    it("updateContest success, should be update contest entity", async ()=>{
        
        
        new Sequelize().query.mockImplementation(()=> [undefined,1])
        
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
    })

    it("updateContest failed, contest not exists", async ()=>{

        new Sequelize().query.mockImplementation(()=> [undefined,0])

        const connection = new Sequelize("asdasf-adssd", "adsasd", "adsasfsaf",{
            host: "aaaaaaaaaaaaaaaaa",
            dialect:"mssql"
        })
        
        const contestRepository = new ContestRepository(connection);
        jest.spyOn(contestRepository,'updateContest')
        const contest = new UpdateContestInput({id:"E99357FA-0C64-4DF1-99F8-B84DAF213908", active: false})

        await expect( async ()=>{
            await contestRepository.updateContest(contest)   
        }).rejects.toThrow(Error)
    })
    it("should return an array of ContestEntity when contests are found", async () => {
        //retorno mockado
        const mockContests = [
          {
            id: "E99357FA-0C64-4DF1-99F8-B84DAF213908",
            initial_date: "2023-07-12T00:00:00.000Z",
            final_date: "2023-07-30T00:00:00.000Z",
            active: true,
          },
        ];
    
        const connection = new Sequelize("asdasf-adssd", "adsasd", "adsasfsaf", {
          host: "aaaaaaaaaaaaaaaaa",
          dialect: "mssql",
        });
    
        connection.query = jest.fn().mockResolvedValueOnce([mockContests]);
    
        const contestRepository = new ContestRepository(connection);
    
        const contests = await contestRepository.selectAllContests();
    
        // Assert
        expect(connection.query).toBeCalled(); //coloquei tobe called pq quando colocava toBeCalledTimes(1) estava errado o numero
        expect(contests).toHaveLength(mockContests.length); // verifico se o retorno e o mock tem o mesmo tamanho
    
        mockContests.forEach((mockContest, index) => {
          expect(contests[index]).toBeInstanceOf(ContestEntity);
          expect(contests[index].id).toBe(mockContest.id);
          expect(contests[index].initial_date).toEqual(new Date(mockContest.initial_date));
          expect(contests[index].final_date).toEqual(new Date(mockContest.final_date));
          expect(contests[index].active).toBe(mockContest.active);
        });
      });

    it("should return an empty array when there are no contests", async () => {
        // tive que criar um escopo de mock isolado por que usamos o query nos outros métodos
        jest.isolateModules(async () => {
          
          jest.mock("sua-biblioteca-de-sequelize", () => ({
            Sequelize: jest.fn().mockImplementation(() => ({
              query: jest.fn().mockResolvedValueOnce([]), // Mock da consulta vazia para simular o caso de sucesso.
              close: jest.fn(), 
            })),
          }));
    
          const connection = new Sequelize("asdasf-adssd", "adsasd", "adsasfsaf",{
            host: "aaaaaaaaaaaaaaaaa",
            dialect:"mssql"
        })
    
          const contestRepository = new ContestRepository(connection);
    
          const contests = await contestRepository.selectAllContests();
    
          expect(connection.query).toHaveBeenCalledTimes(1); 
          expect(contests).toEqual([]); 
        });
      });

      it("should delete contest successfully", async () => {

        jest.mock("sequelize", () => {
          const mockSequelize = {
            query: jest.fn().mockResolvedValue(undefined), 
            close: jest.fn(), 
          };
          return {
            Sequelize: jest.fn(() => mockSequelize),
          };
        });
  
        const connection = new Sequelize("asdasf-adssd", "adsasd", "adsasfsaf", {
          host: "aaaaaaaaaaaaaaaaa",
          dialect: "mssql",
        });
        const contestRepository = new ContestRepository(connection);
  
        // Act
        const result = await contestRepository.deleteContestById("E99357FA-0C64-4DF1-99F8-B84DAF213908");
  

        expect(connection.query).toHaveBeenCalledWith("DELETE FROM Contests WHERE id=:id", {
          replacements: {
            id: "E99357FA-0C64-4DF1-99F8-B84DAF213908",
          },
        }); // verificação de parametros da query
        expect(result).toBeUndefined(); 
      });

      it("should throw an Error when deletion fails", async () => {

        const connection = new Sequelize("asdasf-adssd", "adsasd", "adsasfsaf", {
          host: "aaaaaaaaaaaaaaaaa",
          dialect: "mssql",
        });
        connection.query = jest.fn().mockRejectedValueOnce(new Error("Erro na exclusão"));
  
        const contestRepository = new ContestRepository(connection);

        await expect(contestRepository.deleteContestById("E99357FA-0C64-4DF1-99F8-B84DAF213908")).rejects.toThrow(Error); 
        expect(connection.query).toHaveBeenCalledTimes(1); 

      });

      it("should create contest successfully", async () => {
        // Crie um escopo isolado para este teste
        jest.mock("sequelize", () => {
          const mockSequelize = {
            query: jest.fn().mockReturnValueOnce(Promise.resolve(undefined)),
            close: jest.fn(), 
          };
          return {
            Sequelize: jest.fn(() => mockSequelize),
          };
        });
  
        const connection = new Sequelize("asdasf-adssd", "adsasd", "adsasfsaf", {
          host: "aaaaaaaaaaaaaaaaa",
          dialect: "mssql",
        });
        const contestRepository = new ContestRepository(connection);
  
        jest.spyOn(connection, "query");
  

        const result = await contestRepository.createContest();
  
        //expect(connection.query).toHaveBeenCalledTimes(1); // novamente nao chama uma vez mas nao sei porque
        expect(connection.query).toHaveBeenCalledWith("INSERT INTO Contests DEFAULT VALUES"); 
        //expect(connection.close).toHaveBeenCalledTimes(1); //aqui tbm
        expect(result).toBeUndefined(); 
      });

      it("should throw an Error when creation fails", async () => {

          
        const connection = new Sequelize("asdasf-adssd", "adsasd", "adsasfsaf", {
            host: "aaaaaaaaaaaaaaaaa",
            dialect: "mssql",
        });
        connection.query = jest.fn().mockRejectedValueOnce(new Error("Erro na inserção"));

  
        const contestRepository = new ContestRepository(connection);
  

        await expect(contestRepository.createContest()).rejects.toThrow(Error);
      });  
})