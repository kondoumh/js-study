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

async function patch(body) {
  // retrieve user profile
  const res = await fitness.users.dataSources.datasets.patch({

    dataSourceId: 'raw:com.google.weight:com.google.android.apps.fitness:user_input',
    userId: 'me',
    requestBody: body,
  });
}

function createRequestBody(from, to, val) {
  return {
    dataSourceId: 'raw:com.google.weight:com.google.android.apps.fitness:user_input',
    maxEndTimeNs: to,
    minStartTimeNs: from,
    nextPageToken: "my_netxtPageToken",
    point: [
      {
        dataTypeName: 'com.google.weight',
        originDataSourceId: '',
        startTimeNanos: from,
        endTimeNanos: to,
        value: [
          {
            fpVal: val
          }
        ]
      }
    ]
  }
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
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.body.write',
];

function getPastday(days, hours) {
  let pastday = new Date(new Date().setDate(new Date().getDate() - days));
  pastday.setHours(hours, 0, 0);
  return pastday;
}

const from = getPastday(1, 7);
const to = getPastday(1, 23);

authenticate(scopes)
  .then(client => patch(createRequestBody(from, to, 67.0)))
  .catch(console.error);
