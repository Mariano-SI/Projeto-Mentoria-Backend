import { QueryTypes, Sequelize } from "sequelize";
import { VoteEntity } from "../../../../core/domain/entities/VoteEntity";
import { injectable, inject } from "tsyringe";
import IVoteRepository from "../../../../core/domain/repositories/IVotesRepository";
import { DatabaseContext } from "../context/DatabaseContext";
import { UpdateVoteInput } from "../../../../core/domain/dtos/votes/updateVoteInput";

@injectable()
export default class VoteRepository implements IVoteRepository {
  private _databaseContext: Sequelize;

  constructor(@inject('DatabaseContext') databaseContext: DatabaseContext) {
    this._databaseContext = databaseContext.getSequelizeInstance();
  }

  public async getAllVotes(): Promise<VoteEntity[]> {
    try {
      const result: any[] = (await this._databaseContext.query("SELECT * FROM Votes"))[0];

      if (result && result.length > 0) {
        return result.map((item) => new VoteEntity(item.id, item.user_id, item.participant_id, item.contest_id, new Date(item.creation_date)));
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Erro ao selecionar votos");
    }
  }

  public async getVoteById(id: string): Promise<VoteEntity | null> {
    try {
      const result: any[] = await this._databaseContext.query(`SELECT * FROM Votes WHERE id=:id`, {
        replacements: {
          id: id,
        },
      });

      if (result && result[0] && result[0].length > 0) {
        const voteData = result[0][0];

        const vote = new VoteEntity(
          voteData.id,
          voteData.user_id,
          voteData.participant_id,
          voteData.contest_id,
          new Date(voteData.creation_date)
        );

        return vote;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  public async createVote(user_id: string, participant_id: string, contest_id: string): Promise<void> {
    try {
      const result = await this._databaseContext.query(
        "INSERT INTO Votes (user_id, participant_id, contest_id, creation_date) VALUES (:user_id, :participant_id, :contest_id, NOW())",
        {
          replacements: {
            user_id: user_id,
            participant_id: participant_id,
            contest_id: contest_id,
          },
        }
      );
    } catch (error) {
      throw new Error("Não foi possível criar o voto");
    }
  }

  public async deleteVoteById(id: string): Promise<void> {
    try {
      const result = await this._databaseContext.query(
        "DELETE FROM Votes WHERE id=:id",
        {
          replacements: {
            id: id,
          },
        }
      );
    } catch (error) {
      throw new Error("Não foi possível deletar o voto");
    }
  }

  public async updateVote(input: UpdateVoteInput): Promise<void> {
    const setStatementColumns = [];
  
    if (input.user_id) {
      setStatementColumns.push("user_id = :user_id");
    }
    if (input.participant_id) {
      setStatementColumns.push("participant_id = :participant_id");
    }
    if (input.contest_id) {
      setStatementColumns.push("contest_id = :contest_id");
    }
    // Adicione outros campos que deseja atualizar aqui
  
    const query = `UPDATE Votes SET ${setStatementColumns.join(",")} WHERE id = :id`;
  
    try {
      const result = await this._databaseContext.query(query, {
        replacements: {
          id: input.id,
          user_id: input.user_id,
          participant_id: input.participant_id,
          contest_id: input.contest_id,
        },
      });
  
      if (result[1] === 0) {
        throw new Error("Nenhum registro foi encontrado");
      }
    } catch (error) {
      throw new Error("Não foi possível atualizar o voto");
    }
  }
}
