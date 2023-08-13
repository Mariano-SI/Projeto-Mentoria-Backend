import { Request, Response } from 'express'
import { Sequelize } from "sequelize";
import contestService from '../../../core/application/services/contestsServices';
import ContestRepository from '../../../repository/contestRepository';
import IContestService from '../../../core/domain/repositories/IContestService';
import {injectable, inject} from 'tsyringe'
const express = require('express');


//fazer adapter virar classe que recebe o srvice por construtor
//fazer service no container (data notations pro adapter, igual no service)
//o que fazer com os erros? eles retornam essa msg ou retorna a que for capturada


@injectable()
class ContestAdapter {

  public _router;
  private _contestService: IContestService;
  constructor(@inject('ContestService')contestService: IContestService) {
    this._contestService = contestService;
    this._router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this._router.get('/', this.getAllContests.bind(this));
    this._router.get('/:id', this.getContestById.bind(this));
    this._router.post('/', this.createContest.bind(this));
    this._router.patch('/:id', this.updateContest.bind(this));
    this._router.delete('/:id', this.deleteContest.bind(this));
  }

  async getAllContests(req:Request, res: Response) {
    //const connection = this.createConnection();
    try {
      const contests = await this._contestService.getAllContests();
      res.json(contests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar concursos" });
    }
  }

  async getContestById(req:Request, res: Response) {
    //const connection = this.createConnection();
    const id = req.params.id;

    try {
      const contest = await this._contestService.getContestById( id);
      if (!contest) {
        res.status(404).json({ message: "Concurso não encontrado" });
      } else {
        res.json(contest);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar concurso por ID" });
    } 
  }

  async createContest(req:Request, res: Response) {
    //const connection = this.createConnection();
    try {
      await this._contestService.createContest();
      res.status(201).json({ message: "Concurso criado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar concurso" });
    }
  }

  async updateContest(req:Request, res: Response) {
    //const connection = this.createConnection();
    const id = req.params.id;
    const inputData = req.body;
    inputData.id = id;

    try {
      await this._contestService.updateContest( inputData);
      res.json({ message: "Concurso atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar concurso" });
    }
  }

  async deleteContest(req:Request, res: Response) {
    //const connection = this.createConnection();
    const id = req.params.id;

    try {
      await this._contestService.deleteContestById( id);
      res.json({ message: "Concurso deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar concurso" });
    }
  }

  /*createConnection() {
    return new Sequelize("aaaaaaaaaaaaaaaaa", "bbbbbbbbbbbb", "m-88443244",{
      host: "mentoria-server.database.windows.net",
      port: 1433,
      dialect: "mssql"
    });
  }*/
}

module.exports = ContestAdapter;