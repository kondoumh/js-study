'use strict';

const { google } = require('googleapis');
const fitness = google.fitness('v1');

const { authenticate } = require('./auth');

async function aggregate(client, from, to) {
  // retrieve user profile
  const res = await fitness.users.dataset.aggregate({
    // Aggregate data for the person identified. Use me to indicate the authenticated user. Only me is supported at this time.
    userId: 'me',

    // Request body metadata
    requestBody: {
      "aggregateBy": [
        {
          "dataTypeName": "com.google.step_count.delta",
          "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
        },
        {
          "dataTypeName": "com.google.weight.summary",
          "dataSourceId": "derived:com.google.weight:com.google.android.gms:merge_weight"
        },
      ],
      //   "bucketByActivitySegment": {},
      //   "bucketByActivityType": {},
      //   "bucketBySession": {},
      "bucketByTime": { "durationMillis": 86400000 },
      "startTimeMillis": from.getTime(),
      "endTimeMillis": to.getTime(),
      //   "filteredDataQualityStandard": [],
    },
  });
  const steps = res.data.bucket[0].dataset[0].point[0];
  console.log(steps.originDataSourceId);
  console.log(formatDate(steps.startTimeNanos));
  console.log(formatDate(steps.endTimeNanos));
  console.log(steps.dataTypeName);
  console.log(steps.value[0].intVal);

  const weight = res.data.bucket[0].dataset[1].point[0];
  console.log(weight.originDataSourceId);
  console.log(formatDate(weight.startTimeNanos));
  console.log(formatDate(weight.endTimeNanos));
  console.log(weight.dataTypeName);
  console.log(weight.value[0].fpVal);
}

function formatDate(timestamp) {
  let date = new Date();
  date.setTime(timestamp / 1000000);
  const params = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  };
  return date.toLocaleString("ja", params);
}

const scopes = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.body.write',
];

function getPastday(days, hours) {
  let pastday = new Date(new Date().setDate(new Date().getDate() - days));
  pastday.setHours(hours, 0, 0);
  return pastday;
}

// const from = getPastday(1, 7);
// const to = getPastday(1, 23);
const from = new Date("2020-12-29T00:00:00");
const to = new Date("2020-12-29T23:59:59");

authenticate(scopes)
  .then(client => aggregate(client, from, to))
  .catch(console.error);
