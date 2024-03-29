import { Sequelize } from 'sequelize';
import ContestRepository from '../../../adapters/driven/adapter.database/repository/contestRepository'; 
import { ContestEntity } from '../../domain/entities/ContestEntity';
import { UpdateContestInput } from '../../domain/dtos/contests/updateContestInput';
import IContestRepository from '../../domain/repositories/IContestRepository';
import {injectable, inject, autoInjectable} from 'tsyringe'
import IContestService from '../../domain/services/IContestService';

@injectable()
export default class ContestService implements IContestService {
  private _contestRepository: IContestRepository;

  constructor(@inject('ContestRepository') contestRepository : IContestRepository) {
    this._contestRepository = contestRepository;
  }

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

