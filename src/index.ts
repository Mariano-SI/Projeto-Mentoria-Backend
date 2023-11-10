import 'reflect-metadata';
import ContestRepository from "./adapters/driven/adapter.database/repository/contestRepository"
import { UpdateContestInput } from "./core/domain/dtos/contests/updateContestInput"
import {Sequelize} from 'sequelize'
import { server } from "./infra/server/config";

import VoteRepository from "./adapters/driven/adapter.database/repository/votesRepository";
import { DatabaseContext } from "./adapters/driven/adapter.database/context/DatabaseContext";
import EnvironmentVariables from "./infra/environment/EnvironmentVariables";
import amqp from 'amqplib/callback_api' 

import RabbitmqConfig from './infra/server/rabbitmqConfig';

const rabbitmq = new RabbitmqConfig();

(async () => {
  await rabbitmq.connect('amqp://localhost:5672');
  await rabbitmq.createChannel();

  const queue = 'hello';
  const message = 'Mariano 123 teste!';

  rabbitmq.sendMessage(queue, message);

  rabbitmq.receiveMessage(queue, (msg:any) => {
    console.log("Received message:", msg);
  });

  setTimeout(() => {
    if(rabbitmq.connection){
        rabbitmq.connection.close();
    }
  }, 500);
})();
server
;
