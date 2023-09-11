import "reflect-metadata"
import ContestAdapter from "../../adapters/driving/adapters.rest/contestAdapter";
import { container } from "tsyringe";
import { registerDependency } from "../dependencyInjection/config";
import EnvironmentVariables from "../environment/EnvironmentVariables";
import { DatabaseContext } from "../../adapters/driven/adapter.database/context/DatabaseContext";
import VoteRepository from "../../adapters/driven/adapter.database/repository/votesRepository";
import VotesAdapter from "../../adapters/driving/adapters.rest/votesAdapter";

const dotenv= require('dotenv')
const express = require('express');
dotenv.config();

registerDependency();
const app = express();


app.use('/contests', container.resolve(ContestAdapter).initializeRoutes());
app.use('/votes', container.resolve(VotesAdapter).initializeRoutes());


export const server = app.listen(3000, function(){
   const port = server.address().port;
   console.log(`Servidor iniciado em http://localhost:${port}`)
});