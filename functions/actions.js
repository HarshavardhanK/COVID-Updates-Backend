const functions = require('firebase-functions');
const { dialogflow, SimpleResponse } = require('actions-on-google')

const { NovelCovid } = require('novelcovid')
const axios = require('axios')

const numbers = require('./utils/numbers')

const app = dialogflow({debug: true})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Covid Updates!");
});

exports.indiaData = functions.https.onRequest((request, response) => {

    const track = new NovelCovid()

    track.countries("India").then(data => {
        return response.json({country: 'India', data: data})
    })
    .catch(error => {
        console.log(error)
    })
})
let PREFIX_WORLDOMETER_RESPONSE = "According to Worldometer"
let PREFIX_INDIA_RESPONSE = "According to covid19india.org"

app.intent('India Values', async (conv) => {

    const track = new NovelCovid()
    let indiaData = await track.countries("India")
    let deaths = numbers.format_number(indiaData.deaths)
    let cases = numbers.format_number(indiaData.cases)

    let reply = `${PREFIX_INDIA_RESPONSE}, ${deaths} deaths have been reported of the 
    coronavirus disease in India out of ${cases} confirmed cases`

    conv.close(reply)

})

app.intent('Global Values', async (conv) => {

    const track = new NovelCovid()
    let response = await track.all()
    let deaths = numbers.format_number(response.deaths)
    let cases = numbers.format_number(response.cases)

    let reply = `${PREFIX_WORLDOMETER_RESPONSE}, ${deaths} deaths have been 
    reported of the coronavirus disease out of ${cases} cases confirmed worldwide`

    conv.close(reply)
})

exports.actions_app = app

