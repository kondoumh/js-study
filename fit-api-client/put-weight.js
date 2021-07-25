'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');

const { google } = require('googleapis');
const fitness = google.fitness('v1');

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
    userId: 'me',
    requestBody: {
      "application": {
        name: "patch weight",
        detailsUrl: 'https://example.com',
        version: '1'
      },
      "dataType": {
        name: 'com.google.weight',
        field: [
          {
            name: 'weight',
            format: 'floatPoint'
          }
        ]
      },
      "dataStreamName": "patch weight",
      "type": "raw",
      "device": {
        manufacturer: "my",
        model: "foo",
        type: "scale",
        uid: "1000001",
        version: "1.0"
      },
    }
  });
  console.log(res);
}

async function patch(dataSourceId, end, start, nano, val) {
  // retrieve user profile
  const res = await fitness.users.dataSources.datasets.patch({
    datasetId: '',
    dataSourceId: dataSourceId,
    userId: 'me',
    requestBody: {
      "dataSourceId": dataSourceId,
      "maxEndTimeNs": end,
      "minStartTimeNs": start,
      "value": [
        {
          dataTypeName: 'com.google.weight',
          originDataSourceId: '',
          startTimeNanos: nano,
          endTimeNanos: nano,
          value: [
            {
              fpVal: val
            }
          ]
        }
      ]
    },
  });
}

const scopes = [
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.body.write',
];

authenticate(scopes)
  .then(client => createDataSource())
  .catch(console.error);


function getNano(day) {
  const dt = new Date(day + "T07:00:00");
  return dt.getTime() * 1000000;
}

const dataSourceId = '';
const start = getNano("2020-01-01");
const end = getNano("2021-01-01")
const nano = getNano("2020-12-31");
const val = 69.3;

/*
 authenticate(scopes)
  .then(client => patch(dataSourceId, end, start, nano, val))
  .catch(console.error);
*/
