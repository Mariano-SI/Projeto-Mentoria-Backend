import { Sequelize } from 'sequelize';
import { ContestEntity } from '../../domain/entities/ContestEntity';
import { UpdateContestInput } from '../../domain/dtos/contests/updateContestInput';
import IContestRepository from '../../domain/repositories/IContestRepository';

interface IContestService {
  getAllContests(): Promise<ContestEntity[]>;
  getContestById(id: string): Promise<ContestEntity | null>;
  createContest(): Promise<void>;
  deleteContestById(id: string): Promise<void>;
  updateContest(input: UpdateContestInput): Promise<void>;
}

export default IContestService;
