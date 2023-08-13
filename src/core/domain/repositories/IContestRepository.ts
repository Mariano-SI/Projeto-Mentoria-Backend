import { UpdateContestInput } from "../dtos/contests/updateContestInput";
import { ContestEntity } from "../entities/ContestEntity";

export default interface IContestRepository{
    selectAllContests():Promise<ContestEntity[]>;
    selectConstestById(id: string): Promise<ContestEntity | null>;
    createContest(): Promise<void>;
    deleteContestById(id: string): Promise<void>;
    updateContest(input:UpdateContestInput): Promise<void>;
}