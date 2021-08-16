'use strict';

const { google } = require('googleapis');
const fitness = google.fitness('v1');

const { authenticate } = require('./auth');

async function aggregate(from, to) {
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

  const row = [];
  const steps = res.data.bucket[0].dataset[0].point[0];
  if (steps) {
    row.push(formatDate(steps.startTimeNanos));
    row.push(steps.value[0].intVal);
    row.push(shortenSource(steps.originDataSourceId, "raw:com.google.step_count.cumulative:"));
    //row.push(steps.dataTypeName);
  } else {
    row.push(' ', ' ', ' ');
  }
  const weight = res.data.bucket[0].dataset[1].point[0];
  if (weight) {
    row.push(formatDate(weight.startTimeNanos));
    row.push(weight.value[0].fpVal);
    row.push(shortenSource(weight.originDataSourceId, "raw:com.google.weight:"));
    //row.push(weight.dataTypeName);
  } else {
    row.push(' ', ' ', ' ');
  }
  console.log(row.join(','));
}

function shortenSource(dataSourceId, prefix) {
  if (dataSourceId) {
    if (dataSourceId.indexOf(prefix) === 0) {
      return dataSourceId.substring(prefix.length);
    } else {
      return dataSourceId;
    }
  } else {
    return dataSourceId;
  }
}

async function aggregateDaily(durations) {
  durations.forEach(async d => {
    await aggregate(d.min, d.max);
  });
}

function formatDate(timestamp) {
  let date = new Date();
  date.setTime(timestamp / 1000000);
  const params = {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour12: false
  };
  return date.toLocaleString("ja", params);
}

function makeDurations(from, to) {
  let durations = [];
  const start = new Date(from);
  const end = new Date(to);
  let cur = start;
  while (cur.getTime() <= end.getTime()) {
    let d1 = new Date(cur);
    let d2 = new Date(cur);
    d2.setHours(d2.getHours() + 23);
    d2.setMinutes(d2.getMinutes() + 59);
    d2.setSeconds(d2.getSeconds() + 59);
    durations.push({ min: d1, max: d2 });
    cur.setDate(cur.getDate() + 1);
  }
  return durations;
}

const scopes = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.body.write',
];

const durations = makeDurations("2021-08-01T00:00:00", "2021-08-15T00:00:00");
authenticate(scopes)
  .then(client => aggregateDaily(durations))
  .catch(console.error);

// function getPastday(days, hours) {
//   let pastday = new Date(new Date().setDate(new Date().getDate() - days));
//   pastday.setHours(hours, 0, 0);
//   return pastday;
// }
// const from = getPastday(1, 7);
// const to = getPastday(1, 23);
// authenticate(scopes)
//   .then(client => aggregate(from, to))
//   .catch(console.error);
