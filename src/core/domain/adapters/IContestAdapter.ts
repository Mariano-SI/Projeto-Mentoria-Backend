import { Request, Response } from "express";
import { ContestEntity } from "../entities/ContestEntity";

export interface IContestAdapter{
    getAllContests(req:Request, res: Response): void ;
    getContestById(req:Request, res: Response): void;
    createContest(req:Request, res: Response): void;
    updateContest(req:Request, res: Response): void;
    deleteContest(req:Request, res: Response):void;
}