import "reflect-metadata"
import registerContestRoutes from "../../adapters/driving/adapters.rest/routes/contestRoutes";
import ContestAdapter from "../../adapters/driving/adapters.rest/contestAdapter";
import { container } from "tsyringe";
import { registerDependency } from "../dependencyInjection/config";


const express = require('express');
registerDependency();
const app = express();

registerContestRoutes(app);
app.use('/contests', container.resolve(ContestAdapter).initializeRoutes());


export const server = app.listen(3000, function(){
   const port = server.address().port;
   console.log(`Servidor iniciado em http://localhost:${port}`)
});