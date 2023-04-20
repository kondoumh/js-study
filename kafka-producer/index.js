const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

(async() => {
  await producer.connect();
  await producer.send({
    topic: 'test',
    messages: [
      {
        key: 'key1',
        value: 'Hello KafkaJS user!',
        headers: {
          'correlation-id': '1234',
        },
      }
    ],
  });
})();
