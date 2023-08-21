import {Express, Request, Response} from 'express'
import InstanceFactory from '../../../../infra/dependencyInjection/InstanceFactory';
import ContestAdapter from '../contestAdapter';

export default function registerContestRoutes(app: Express){
    

    app.get('/contests/', (req:Request, res: Response)=> InstanceFactory(ContestAdapter).getAllContests(req, res));
    //app.get('/:id', getContestById);
    //app.post('/', createContest);
    //app.patch('/:id', updateContest);
    //app.delete('/:id', deleteContest);
}