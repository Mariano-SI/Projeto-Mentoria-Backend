import { VoteEntity } from '../../domain/entities/VoteEntity';
import { UpdateVoteInput } from '../../domain/dtos/votes/updateVoteInput';

interface IVotesService {
  getAllVotes(): Promise<VoteEntity[]>;
  getVoteById(id: string): Promise<VoteEntity | null>;
  createVote(
    user_id: string,
    participant_id: string,
    contest_id: string
  ): Promise<void>;
  deleteVoteById(id: string): Promise<void>;
  updateVote(input: UpdateVoteInput): Promise<void>;
}

export default IVotesService;