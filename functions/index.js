const functions = require('firebase-functions');

const india = require('./covid/india')
const requests = require('./covid/requests')
const app = require('./actions')

//GOOGLE ACTIONS FULLFILMENT WEBHOOK
exports.fulfillment = functions.https.onRequest(app.actions_app)

//CORONAVIRUS INDIA STATS WEBHOOK
exports.district_data = functions.https.onRequest(async (request, response) => {

    let latitude = request.query.latitude
    let longitude = request.query.longitude

    let location = await requests.reverse_geocode(latitude, longitude)
    let data = await india.get_district_data(location.state, location.district)

    response.send(data)
})

exports.state_data = functions.https.onRequest(async (request, response) => {

    let state = request.query.state

    try {

        let data = await india.get_state_data(state)

        if(data) {
            response.json({data: data, status: 200})

        } else {
            response.json({status: 500, message: "Internal error"})
        }

    } catch(error) {
        console.log(error)
        response.json({status: 500, message: "Internal error"})
    }
    
})