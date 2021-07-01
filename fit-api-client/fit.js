'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');

const {google} = require('googleapis');
const fitness = google.fitness('v1');

const keyPath = path.join(__dirname, 'oauth2.keys.json');
let keys = {redirect_uris: ['']};
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;
}

const oauth2Client = new google.auth.OAuth2(
  keys.client_id,
  keys.client_secret,
  keys.redirect_uris[0]
);

google.options({auth: oauth2Client});

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
            const {tokens} = await oauth2Client.getToken(qs.get('code'));
            oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
            resolve(oauth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        opn(authorizeUrl, {wait: false}).then(cp => cp.unref());
      });
    destroyer(server);
  });
}

async function aggregate() {
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
      "startTimeMillis": 1624658400000,
      "endTimeMillis": 1624698000000,
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
  let date = new Date()
  date.setTime(timestamp / 1000000)
  const params = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  }
  return date.toLocaleString("ja", params)
}

const scopes = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.body.write',
];
authenticate(scopes)
  .then(client => aggregate(client))
  .catch(console.error);
