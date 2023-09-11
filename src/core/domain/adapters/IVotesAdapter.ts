import { Request, Response } from 'express';

export interface IVoteAdapter {
  getAllVotes(req: Request, res: Response): void;
  getVoteById(req: Request, res: Response): void;
  createVote(req: Request, res: Response): void;
  updateVote(req: Request, res: Response): void;
  deleteVote(req: Request, res: Response): void;
}
