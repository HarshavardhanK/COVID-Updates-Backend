const axios = require('axios')
const functions = require('firebase-functions')

exports.get_data = async() => {

    try {
        let response = await axios.get('https://api.covid19india.org/data.json')
        
        if(response.data) {
            console.log("Fetched data.json successfully")
            return response.data
    
        } else {
            return null
        }

    } catch(error) {
        console.log(error)

    } finally {
        console.log("Finished data.json processing request")
    }
}

exports.reverse_geocode = async (latitude, longitude) => {

    let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
    url = url + latitude + "," + longitude
    url = url + "&key=" +  functions.config().maps_api.key //"AIzaSyC7t6460LgKv2u1J4vvAgoxmvZWq3TOYDc"

    try {

        let response = await axios.get(url) 
        let results = response.data.results[0]

        let components = results.address_components
        console.log(components)

        let district = components.filter(component => 
            component.types[0] === 'administrative_area_level_2')[0].long_name

        let state = components.filter(component => 
            component.types[0] === 'administrative_area_level_1')[0].long_name

        let object = {district: district, state: state}

        console.log(object)

        return object

    } catch(error) {
        console.log(error)
        return null

    }
}



//this.reverse_geocode(13.3409, 74.7421)