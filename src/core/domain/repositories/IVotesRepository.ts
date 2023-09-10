import { UpdateVoteInput } from "../dtos/votes/updateVoteInput";
import { VoteEntity } from "../entities/VoteEntity";

export default interface IVoteRepository {
    getAllVotes(): Promise<VoteEntity[]>;
    getVoteById(id: string): Promise<VoteEntity | null>;
    createVote(user_id: string, participant_id: string, contest_id: string): Promise<void>;
    deleteVoteById(id: string): Promise<void>;
    updateVote(input: UpdateVoteInput): Promise<void>;
}