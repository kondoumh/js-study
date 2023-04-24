import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const message = {'greeting': 'Hello KafkaJS user!', 'name': 'John Doe' };

await producer.connect();
await producer.send({
  topic: 'test',
  messages: [
    {
      value: JSON.stringify(message),
      headers: {
        'correlation-id': '1234',
      },
    }
  ],
});
