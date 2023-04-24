const {google} = require('googleapis');

// Create a Google Fit service object.
const fitness = google.fitness({
  version: 'v1',
  auth: new google.auth.OAuth2(),
});

// Set the user ID.
const userId = 'me';

// Create a body object for the weight data.
const body = {
  dataTypeName: 'com.google.weight.summary',
  dataSourceId: 'derived:com.google.weight:com.google.android.gms:merge_weight',
  value: [
    {      
      time: new Date().getTime(),
      value: 69.1,
    },
  ],
};

// Call the `users.dataset.insert()` method to register the weight data.
async function registerWeightData() {
  try {
    const res = await fitness.users.dataset.insert({
      userId,
      body,
    });
    console.log('Weight data registered successfully.');
  } catch (err) {
    console.log(err);
  }
}

// Register the weight data.
registerWeightData();
