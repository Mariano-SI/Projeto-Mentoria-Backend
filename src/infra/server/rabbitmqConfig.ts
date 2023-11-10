import amqp, { Connection, Channel }  from 'amqplib/callback_api';

class RabbitmqConfig {
    public connection: Connection | null;
    public channel: Channel | null;
    constructor() {
        this.connection = null;
        this.channel = null;
    }

    connect(url: string) {
        return new Promise((resolve, reject) => {
        amqp.connect(url, (err, conn) => {
            if (err) {
            reject(err);
            } else {
            this.connection = conn;
            resolve(conn);
            }
        });
        });
    }

    createChannel() {
        return new Promise((resolve, reject) => {
            if(this.connection){
                this.connection.createChannel((err, ch) => {
                if (err) {
                    reject(err);
                } else {
                    this.channel = ch;
                    resolve(ch);
                }
                });
            }
        });
    }

    sendMessage(queue: string, message: string) {
        if(this.channel){
            this.channel.assertQueue(queue, { durable: false });
            this.channel.sendToQueue(queue, Buffer.from(message));
            console.log(" [x] Sent %s", message);
        }
    }

    receiveMessage(queue: string, callback: (msg: string) => void) {
        if(this.channel){
            this.channel.assertQueue(queue, { durable: false });
            this.channel.prefetch(1);
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            this.channel.consume(queue, (msg) => {
            if (msg) {
                console.log(" [x] Received %s", msg.content.toString());
                callback(msg.content.toString());
            }
            }, { noAck: true });
        }
    }
}

export default RabbitmqConfig;