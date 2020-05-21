const functions = require('firebase-functions');

const india = require('./covid/india')

//GOOGLE ACTIONS FULLFILMENT WEBHOOK
exports.fulfillment = functions.https.onRequest(app)