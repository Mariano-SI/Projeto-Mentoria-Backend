import {container} from 'tsyringe';
import { Sequelize } from 'sequelize';
import IContestRepository from '../../core/domain/repositories/IContestRepository';
import ContestRepository from '../../repository/contestRepository';
import IContestService from '../../core/domain/repositories/IContestService';
import ContestService from '../../core/application/services/contestsServices';


export const registerDependency = ()=>{
    container.registerSingleton<Sequelize>('Sequelize', Sequelize);
    container.registerSingleton<IContestRepository>('ContestRepository', ContestRepository);
    container.registerSingleton<IContestService>('ContestService', ContestService);
}