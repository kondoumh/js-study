const { EventHubProducerClient } = require("@azure/event-hubs");
const config = require("config");

const connectionString = config.get("sendConnectionString");
const eventHubName = "mheventhub";

async function main() {
  const producer = new EventHubProducerClient(connectionString, eventHubName);
  const batch = await producer.createBatch();
  batch.tryAdd({ body: { id: "e01", name: "1st event" } });
  batch.tryAdd({ body: { id: "e02", name: "2nd event" } });
  batch.tryAdd({ body: { id: "e03", name: "3rd event" } });

  await producer.sendBatch(batch);
  await producer.close();
  console.log("A batch of three events have been sent to the event hub");
}

main().catch( err => {
  console.log("Error occurred: ", err);
})
