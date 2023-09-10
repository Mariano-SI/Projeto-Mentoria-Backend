interface IUpdateVoteInput {
    id: string;
    user_id?: string;
    participant_id?: string;
    contest_id?: string;
}   
  
  export class UpdateVoteInput {
    public id: string;
    public user_id?: string;
    public participant_id?: string;
    public contest_id?: string;

  
    constructor({ id, user_id, participant_id, contest_id }: IUpdateVoteInput) {
      this.id = id;
      this.user_id = user_id;
      this.participant_id = participant_id;
      this.contest_id = contest_id;

    }
  }
  