import "reflect-metadata"
import registerContestRoutes from "../../adapters/driving/adapters.rest/routes/contestRoutes";
import ContestAdapter from "../../adapters/driving/adapters.rest/contestAdapter";
import { container } from "tsyringe";


const express = require('express');

const app = express();

registerContestRoutes(app);
app.use('/contests', container.resolve(ContestAdapter));

/* Suponha que contestService seja a instância do ContestService
const contestRouter = new ContestRouter(contestService);
const contestRoutes = contestRouter.getRouter();

app.use('/contests', contestRoutes);*/

export const server = app.listen(3000, function(){
   const host = server.address().address;
   const port = server.address().port;
   console.log(`Servidor iniciado em http://localhost:${port}`)
});