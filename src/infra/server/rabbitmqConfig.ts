import amqp from 'amqplib/callback_api' 
class RabbitmqConfig{
    constructor() {
        
    }


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
}