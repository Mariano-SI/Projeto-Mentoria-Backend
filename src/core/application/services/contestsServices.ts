import { Sequelize } from 'sequelize';
import ContestRepository from '../../../repository/contestRepository'; 
import { ContestEntity } from '../../domain/entities/ContestEntity';
import { UpdateContestInput } from '../../domain/dtos/contests/updateContestInput';
import IContestRepository from '../../domain/repositories/IContestRepository';
import {injectable, inject} from 'tsyringe'

@injectable()
export default class ContestService {
  private _contestRepository: IContestRepository;

  constructor(@inject('ContestRepository') contestRepository : IContestRepository) {
    this._contestRepository = contestRepository;
  }
  /*como vamos passar a conexão para o reporitorio?
  antes ele recebia assim: 
  export default class ContestService {
  private _contestRepository: ContestRepository;

  constructor(dbConnection: Sequelize) {
    this._contestRepository = new ContestRepository(dbConnection);
  }*/

  public async getAllContests(): Promise<ContestEntity[]> {
    try {
      return await this._contestRepository.selectAllContests();
    } catch (error) {
      throw new Error("Erro ao buscar contests");
    }
  }

  public async getContestById(id: string): Promise<ContestEntity | null> {
    try {
      return await this._contestRepository.selectConstestById(id);
    } catch (error) {
      throw new Error("Erro ao buscar contest por ID");
    }
  }

  public async createContest(): Promise<void> {
    try {
      await this._contestRepository.createContest();
    } catch (error) {
      throw new Error("Não foi possível criar o contest");
    }
  }

  public async deleteContestById(id: string): Promise<void> {
    try {
      await this._contestRepository.deleteContestById(id);
    } catch (error) {
      throw new Error("Não foi possível deletar o contest");
    }
  }

  public async updateContest(input: UpdateContestInput): Promise<void> {
    try {
      await this._contestRepository.updateContest(input);
    } catch (error) {
      throw new Error("Não foi possível atualizar o contest");
    }
  }
}

