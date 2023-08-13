const express = require('express');

const app = express();


app.use('/contests', require("../../adapters/driving/adapters.rest/contestAdapter"));

/* Suponha que contestService seja a instância do ContestService
const contestRouter = new ContestRouter(contestService);
const contestRoutes = contestRouter.getRouter();

app.use('/contests', contestRoutes);*/

export const server = app.listen(3000, function(){
   const host = server.address().address;
   const port = server.address().port;
   console.log(`Servidor iniciado em http://localhost:${port}`)
});