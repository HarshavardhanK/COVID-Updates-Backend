const axios = require('axios')

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