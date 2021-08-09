'use strict';

const { google } = require('googleapis');
const fitness = google.fitness('v1');
const { readCsv } = require('./read-csv');
const { authenticate } = require('./auth');

async function createDataSource() {
  const res = await fitness.users.dataSources.create({
    userId: "me",
    requestBody: {
      "application": {
        name: "patch_weight",
        detailsUrl: 'https://example.com',
        version: "1"
      },
      "dataType": {
        name: "com.google.weight",
        field: [
          {
            name: "weight",
            format: "floatPoint"
          }
        ]
      },
      "dataStreamName": "patch_weight",
      "type": "raw",
      "device": {
        manufacturer: "my",
        model: "foo",
        type: "scale",
        uid: "1000001",
        version: "1.0"
      }
    }
  });
  console.log(res.data);
}

async function getDataSource(dataSourceId) {
  const res = await fitness.users.dataSources.get({
    dataSourceId: dataSourceId,
    userId: "me"
  });
  console.log(res.data);
}

async function getDataSet(datasetId, dataSourceId) {
  const res = await fitness.users.dataSources.datasets.get({
    datasetId: datasetId,
    dataSourceId: dataSourceId,
    userId: "me"
  });
  console.log(res.data.point);
}

async function listDataSource() {
  const res = await fitness.users.dataSources.list({
    //dataTypeName: "com.google.weihgt",
    userId: "me"
  });
  console.log(res.data.dataSource);
}

async function deleteDataSource() {
  const res = await fitness.users.dataSources.delete({
    dataSourceId: dataSourceId,
    userId: "me"
  });
  console.log(res.data);
}

async function patch(dataSourceId, datasetId, end, start, time, val) {
  // retrieve user profile
  const res = await fitness.users.dataSources.datasets.patch({
    datasetId: datasetId,
    dataSourceId: dataSourceId,
    userId: "me",
    requestBody: {
      "dataSourceId": dataSourceId,
      "maxEndTimeNs": end,
      "minStartTimeNs": start,
      "point": [
        {
          dataTypeName: "com.google.weight",
          originDataSourceId: "",
          startTimeNanos: time,
          endTimeNanos: time,
          value: [
            {
              fpVal: val
            }
          ]
        }
      ]
    },
  });
  console.log(res.data);
}

// authenticate(scopes)
//   .then(client => getDataSource("xxxxxx"))
//   .catch(console.error);

// authenticate(scopes)
//   .then(client => listDataSource())
//   .catch(console.error);

// authenticate(scopes)
//   .then(client => createDataSource())
//   .catch(console.error);

// authenticate(scopes)
//   .then(client => deleteDataSource("xxxxxx"))
//   .catch(console.error);

async function postData(data, dataSourceId) {
  data.forEach(async e => {
    const datasetId = `${e.min}-${e.max}`;
    console.log(e.weight, datasetId);
    await patch(dataSourceId, datasetId, e.max, e.min, e.time, e.weight);
  });
}

const dataSourceId = "raw:com.google.weight:410630221267:my:foo:1000001:patch_weight";
const data = readCsv("weight.csv");
const scopes = [
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.body.write',
];

authenticate(scopes)
  .then(client => postData(data, dataSourceId))
  .catch(console.error);

// authenticate(scopes)
//   .then(client => getDataSet(datasetId, dataSourceId))
//   .catch(console.error);
