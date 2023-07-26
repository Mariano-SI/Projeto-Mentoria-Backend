import { QueryTypes, Sequelize } from "sequelize";
import { UpdateContestInput } from "../domain/dtos/contests/updateContestInput";
import { ContestEntity } from "../domain/entities/ContestEntity";

export default class ContestRepository {
  private _dbConnection: Sequelize;
  constructor(dbConnection: Sequelize) {
    this._dbConnection = dbConnection;
  }

  public async selectAllContests():Promise<ContestEntity[]> {
    try {
      const result:any[] = (await this._dbConnection.query("SELECT * FROM Contests"))[0];

      if (result && result.length > 0) {
        return result.map((item) => new ContestEntity(item.id, new Date(item.initial_date), new Date(item.final_date), item.active));
      } else {
        return []; // Retorna um array vazio caso não haja resultados.
      }
    } catch (error) {
      console.log(error)
      throw new Error("Erro ao selecionar contests");
    } finally {
      this._dbConnection.close();
    }
  }

  //Perguntar pro caio pq estamos tipando com classe ao inves de usar uma type ou interface
  public async selectConstestById(id: string): Promise<ContestEntity | undefined> {
    try {
      const result: any[] = await this._dbConnection.query(`SELECT * FROM Contests WHERE id=:id`, {
        replacements: {
          id: id,
        },
      });

      if (result && result.length > 0) {
        const contestData = result[0][0];

        const contest = new ContestEntity(
          contestData.id,
          new Date(contestData.initial_date),
          new Date(contestData.final_date),
          contestData.active
        );
  
        return contest;
      } 
    } catch (error) {
      throw(error)
    } finally{
        this._dbConnection.close()
    }
  }

  public async createContest() {
    try {
      const result = await this._dbConnection.query(
        "INSERT INTO Contests DEFAULT VALUES"
      );
      console.log(result)
      return result;
    } catch (error) {
      throw new Error("Não foi possivel criar o contest");
    } finally {
      this._dbConnection.close();
    }
  }

  public async deleteContestById(id: string) {
    try {
      const result = await this._dbConnection.query(
        "DELETE FROM Contests WHERE id=:id",
        {
          replacements: {
            id: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw new Error("Não foi possivel deletar o contest");
    } finally {
      this._dbConnection.close();
    }
  }
  
  public async updateContest(input:UpdateContestInput){
    
    const setStatementCollumns = [] //copiei da Round, gostei.

    if(input.initialDate){
        setStatementCollumns.push("initial_date= :initialDate")
    }
    if(input.finalDate){
        setStatementCollumns.push("final_date= :finalDate")
    }
    if (input.active != null) {
        setStatementCollumns.push("active =:active")
    }
    const query =`UPDATE Contests SET ${setStatementCollumns.join(",")} WHERE id=:id`
        const result = await this._dbConnection.query(
            query,
            {
              replacements: {
                id : input.id,
                initialDate: input.initialDate,
                finalDate: input.finalDate,
                active: input.active
              },
            }
          );
          if(result[1] === 0){
            throw new Error("Nenhum registro foi encontrado");
          }
          return result
 
  }
}

//nao tipei createContest, updateContest e deleteContestById por que eleas retornam result que estavamos tipando como any, pergintar o que fazer


