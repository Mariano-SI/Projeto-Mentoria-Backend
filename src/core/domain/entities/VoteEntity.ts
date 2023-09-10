import { Guid } from 'guid-typescript';

export class VoteEntity {
  public id: Guid;
  public user_id: Guid;
  public participant_id: Guid;
  public contest_id: Guid;
  public creation_date: Date;

  constructor(id: Guid, user_id: Guid, participant_id: Guid, contest_id: Guid, creation_date: Date) {
    this.id = id;
    this.user_id = user_id;
    this.participant_id = participant_id;
    this.contest_id = contest_id;
    this.creation_date = creation_date;
  }
}