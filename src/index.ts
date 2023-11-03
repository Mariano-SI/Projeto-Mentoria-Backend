import 'reflect-metadata';
import ContestRepository from "./adapters/driven/adapter.database/repository/contestRepository"
import { UpdateContestInput } from "./core/domain/dtos/contests/updateContestInput"
import {Sequelize} from 'sequelize'
import { server } from "./infra/server/config";

import VoteRepository from "./adapters/driven/adapter.database/repository/votesRepository";
import { DatabaseContext } from "./adapters/driven/adapter.database/context/DatabaseContext";
import EnvironmentVariables from "./infra/environment/EnvironmentVariables";
import amqp from 'amqplib/callback_api' 

amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        const q = 'hello';
        const msg = 'Hello World 123!';
        ch.assertQueue(q, { durable: false });     
        ch.sendToQueue(q, new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () { conn.close(); }, 500);
});
amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';

        ch.assertQueue(q, { durable: false });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
            if(msg){
                console.log(" [x] Received %s", msg.content.toString());
            }
        }, { noAck: true });
    });
});
//server;


/*function app(){
    const teste = new ContestRepository( new Sequelize("mentoria-db", "Mariano", "m-88443244",{
        host: "mentoria-server.database.windows.net",
        port: 1433,
        dialect:"mssql"
    }))
 
    teste.selectAllContests().then((result)=> console.log(result))
}
app()*/