const { EventHubConsumerClient } = require("@azure/event-hubs");
const { ContainerClient } = require("@azure/storage-blob");
const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");
const config = require("config");

const connectionString = config.get("receiveConnectionString");
const eventHubName = "mheventhub";
const consumerGroup = "$Default";
const storageConnectionString = config.get("storageConnectionString");
const containerName = "eventhub-checkpoint-blob";

async function main() {
  const containerClient = new ContainerClient(storageConnectionString, containerName);
  const checkpointStore = new BlobCheckpointStore(containerClient);

  const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName, checkpointStore);

  const subscription = consumerClient.subscribe({
    processEvents: async (events, context) => {
      if (events.length == 0) {
        console.log('No events received within wait time. Waiting for next interval');
        return;
      }

      for (const event of events) {
        console.log(`Received event: '${event.body.name}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`);
      }
      await context.updateCheckpoint(events[events.length - 1]);
    },

    processError: async (err, context) => {
      console.log(`Error : ${err}`);
    }
  });

  await new Promise(resolve => {
    setTimeout(async () => {
      await subscription.close();
      await consumerClient.close();
      resolve();
    }, 30000);
  });
}

main().catch( err => {
  console.log("Error occurred: ", err);
});
