import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import IVoteService from '../../../core/domain/services/IVoteService';
import { UpdateVoteInput } from '../../../core/domain/dtos/votes/updateVoteInput';
import { IVoteAdapter } from '../../../core/domain/adapters/IVotesAdapter';
const express = require('express');

@injectable()
export default class VotesAdapter implements IVoteAdapter {
    public _router;
    private _voteService: IVoteService;
  

  constructor(@inject('VotesService') voteService: IVoteService) {
    this._router = express.Router();
    this._voteService = voteService;
  }

  public initializeRoutes() {
    this._router.get('/', this.getAllVotes.bind(this));
    this._router.get('/:id', this.getVoteById.bind(this));
    this._router.post('/', this.createVote.bind(this));
    this._router.patch('/:id', this.updateVote.bind(this));
    this._router.delete('/:id', this.deleteVote.bind(this));
    return this._router;
  }

  async getAllVotes(req: Request, res: Response) {
    try {
      const votes = await this._voteService.getAllVotes();
      res.json(votes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar votos" });
    }
  }

  async getVoteById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const vote = await this._voteService.getVoteById(id);
      if (!vote) {
        res.status(404).json({ message: "Voto não encontrado" });
      } else {
        res.json(vote);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar voto por ID" });
    }
  }

  async createVote(req: Request, res: Response) {

    const {user_id, participant_id, contest_id} = req.body;
    try {
      await this._voteService.createVote(user_id, participant_id, contest_id);
      res.status(201).json({ message: "Voto criado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar voto" });
    }
  }

  async updateVote(req: Request, res: Response) {
    const id = req.params.id;
    const inputData: UpdateVoteInput = req.body;
    inputData.id = id;

    try {

      await this._voteService.updateVote(inputData);
      res.json({ message: "Voto atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar voto" });
    }
  }

  async deleteVote(req: Request, res: Response) {
    const id = req.params.id;

    try {
      
      await this._voteService.deleteVoteById(id);
      res.json({ message: "Voto deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar voto" });
    }
  }
}
