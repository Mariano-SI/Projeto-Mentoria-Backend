import { QueryTypes, Sequelize } from "sequelize";
import { UpdateContestInput } from "../../../../core/domain/dtos/contests/updateContestInput";
import { ContestEntity } from "../../../../core/domain/entities/ContestEntity";
import { injectable, inject } from "tsyringe";
import IContestRepository from "../../../../core/domain/repositories/IContestRepository";
import { DatabaseContext } from "../context/DatabaseContext";

@injectable()
export default class ContestRepository implements IContestRepository{
  private _databaseContext: Sequelize;

  constructor(@inject('DatabaseContext') databaseContext: DatabaseContext) {
    this._databaseContext =  databaseContext.getSequelizeInstance();
  }

  public async selectAllContests():Promise<ContestEntity[]> {
    try {
      const result:any[] = (await this._databaseContext.query("SELECT * FROM Contests"))[0];

      if (result && result.length > 0) {
        return result.map((item) => new ContestEntity(item.id, new Date(item.initial_date), new Date(item.final_date), item.active));
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Erro ao selecionar contests");
    }
  }
  

  public async selectConstestById(id: string): Promise<ContestEntity | null> {
    try {
      const result: any[] = await this._databaseContext.query(`SELECT * FROM Contests WHERE id=:id`, {
        replacements: {
          id: id,
        },
      });

      if (result && result[0] && result[0].length > 0) {
        const contestData = result[0][0];


        const contest = new ContestEntity(
          contestData.id,
          new Date(contestData.initial_date),
          new Date(contestData.final_date),
          contestData.active
        );
  
        return contest;
      }else{
        return null;
      }

    } catch (error) {
      throw(error)
    }
  }

  public async createContest(): Promise<void> {
    try {
      const result = await this._databaseContext.query(
        "INSERT INTO Contests DEFAULT VALUES"
      );
    } catch (error) {
      throw new Error("Não foi possivel criar o contest");
    } finally {
      this._databaseContext.close();
    }
  }

  public async deleteContestById(id: string): Promise<void> {
    try {
      const result = await this._databaseContext.query(
        "DELETE FROM Contests WHERE id=:id",
        {
          replacements: {
            id: id,
          },
        }
      );

    } catch (error) {
      throw new Error("Não foi possivel deletar o contest");
    }
  }
  
  public async updateContest(input:UpdateContestInput): Promise<void>{
    
    const setStatementCollumns = []

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
        const result = await this._databaseContext.query(
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
  }
}

//nao tipei createContest, updateContest e deleteContestById por que eleas retornam result que estavamos tipando como any, pergintar o que fazer


