'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');

const { google } = require('googleapis');
const fitness = google.fitness('v1');
const { readCsv } = require('./read-csv');

const keyPath = path.join(__dirname, 'oauth2.keys.json');
let keys = { redirect_uris: [''] };
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;
}

const oauth2Client = new google.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  keys.redirect_uris[0]
);

google.options({ auth: oauth2Client });

async function authenticate(scopes) {
  return new Promise((resolve, reject) => {
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams;
            res.end('Authentication successful! Please return to the console.');
            server.destroy();
            const { tokens } = await oauth2Client.getToken(qs.get('code'));
            oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
            resolve(oauth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        opn(authorizeUrl, { wait: false }).then(cp => cp.unref());
      });
    destroyer(server);
  });
}

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

const scopes = [
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.body.write',
];

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

function getNano(day) {
  const dt = new Date(day);
  return dt.getTime() * 1000000;
}

const dataSourceId = "raw:com.google.weight:410630221267:my:foo:1000001:patch_weight";
const start = getNano("2020-12-29T00:00:00");
const end   = getNano("2021-12-29T23:59:59");
const time  = getNano("2020-12-29T07:00:00");
const datasetId = `${start}-${end}`;
const val = 68.6;

const data = readCsv();
console.log(data);

authenticate(scopes)
  .then(client => patch(dataSourceId, datasetId, end, start, time, val))
  .catch(console.error);

// authenticate(scopes)
//   .then(client => getDataSet(datasetId, dataSourceId))
//   .catch(console.error);
