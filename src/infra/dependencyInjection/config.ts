import {container} from 'tsyringe';
import { Sequelize } from 'sequelize';
import IContestRepository from '../../core/domain/repositories/IContestRepository';
import ContestRepository from '../../adapters/driven/adapter.database/repository/contestRepository';
import IContestService from '../../core/domain/services/IContestService';
import ContestService from '../../core/application/services/contestsServices';
import { IContestAdapter } from '../../core/domain/adapters/IContestAdapter';
import ContestAdapter from '../../adapters/driving/adapters.rest/contestAdapter'
import { DatabaseContext } from '../../adapters/driven/adapter.database/context/DatabaseContext';
import { EnvironmentVariables } from '../environment/EnvironmentVariables';
import IVoteRepository from '../../core/domain/repositories/IVotesRepository';
import IVotesService from '../../core/domain/services/IVoteService';
import VotesService from '../../core/application/services/votesService';
import { IVoteAdapter } from '../../core/domain/adapters/IVotesAdapter';
import VotesAdapter from '../../adapters/driving/adapters.rest/votesAdapter';
import VotesRepository from '../../adapters/driven/adapter.database/repository/votesRepository';


export const registerDependency = ()=>{
    container.registerSingleton('EnvironmentVariables', EnvironmentVariables)
    container.registerSingleton('DatabaseContext', DatabaseContext);
    container.register<IContestRepository>('ContestRepository', ContestRepository);
    container.register<IContestService>('ContestService', ContestService);
    container.registerSingleton<IContestAdapter>('ContestAdapter', ContestAdapter)
    container.registerSingleton<IVoteRepository>('VotesRepository', VotesRepository );
    container.register<IVotesService>('VotesService', VotesService);
    container.registerSingleton<IVoteAdapter>('VotesAdaçpter', VotesAdapter);
}



