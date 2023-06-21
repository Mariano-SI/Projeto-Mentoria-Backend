import { QueryTypes, Sequelize } from "sequelize";
import { UpdateContestInput } from "../domain/dtos/contests/updateContestInput";

export default class ContestRepository {
  private _dbConnection: Sequelize;
  constructor(dbConnection: Sequelize) {
    this._dbConnection = dbConnection;
  }

  public async selectAllContests() {
    try {
      const result = await this._dbConnection.query("SELECT * FROM Contests");
      console.log(result)
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      this._dbConnection.close();
    }
  }

  public async selectConstestById(id:string) {
    try {
        const result = await this._dbConnection.query(`SELECT * FROM Contests WHERE id=:id`,{
            replacements:{
                id:id
            }
        });
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
    } finally{
        this._dbConnection.close()
    }
  }

  public async createContest() {
    try {
      const result = await this._dbConnection.query(
        "INSERT INTO Contests DEFAULT VALUES"
      );
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      this._dbConnection.close();
    }
  }

  public async deleteContestById(id: string) {
    try {
      const result = await this._dbConnection.query(
        "DELETE FROM Contests WHERE id=:id",
        {
          /* type:QueryTypes.DELETE, */
          replacements: {
            id: id,
          },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      this._dbConnection.close();
    }
  }
  
  public async updateContest(input:UpdateContestInput){
    //perguntar Caio: onde colocar a interface que usei no parametro?

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



  //perguntar caio: passar parametros em forma de objeto é melhor por conta de ser chave/valor, quando passei os argumentos soltos tive problemas em casos onde nao precisava passar todos os argumentos, pq o js interpreta eles em ordem entao quando defini a função para receber (id, inicial, final, active) tive problemas em caso onde por ex eu n quisesse passar um desses parametros ex: (id, active) pois o id passava a ser considerado o segundo parametro(initial)
}


