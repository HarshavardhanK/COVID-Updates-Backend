const axios = require('axios')

const get_state_data = async(state) => {

    try {
        let response = await axios.get('https://api.covid19india.org/data.json')
        
        if(response.data.statewise) {

            let states = response.data.statewise

            let _state = states.filter(states => states.state === state)

            return _state[0]

        } else {
            return null
        }

    } catch(error) {
        console.log(error)

    } finally {
        console.log("Finished processing request")
    }
}



const get_district_data = async(state, district) => {

    let URL = "https://api.covid19india.org/state_district_wise.json"

    try {

        let response = await axios.get(URL)

        if(response.data) {
            console.log(response.data)
            let district_ = response.data[state].districtData[district]
            return district_
        } else {
            console.log("ERROR PROCESSING DISTRICT DATA")
        }

    } catch(error) {
        console.log(error)

    } finally {
        console.log("Finished processing district request")
    }
}

const deaths = (object) => {
    return object.deaths
}

const active = (object) => {
    return object.active
}

const recovered = (object) => {
    return object.recovered
}

const total = (object) => {
    return object.confirmed
}

const last_updated = (object) => {
    return object.lastupdatedtime
}

const new_deaths = (object) => {
    return object.deltadeaths
}

const new_recovered = (object) => {
    return object.deltarecovered
}

const new_confirmed = (object) => {
    return object.deltaconfirmed
}

const india_count = async() => {

    const INDIA = 'Total'
    const data = await get_state_data(INDIA)

    let deaths_ = deaths(data)
    let recovered_ = recovered(data)
    let active_ = active(data)
    let confirmed_ = total(data)

    console.log(confirmed_)

}

const state_test = async() => {

    let data = await get_state_data('Karnataka')
    console.log(active(data))

    let deaths_ = deaths(data)
    console.log(deaths_)

    let recovered_ = recovered(data)
    console.log(recovered_)

}

const district_test = async() => {
    let data = await get_district_data('Karnataka', 'Bengaluru Urban')
    console.log(data)
}

const main = async () => {
    //await district_test()
    await india_count()
}

//EXPORTS
exports.get_district_data = get_district_data

main()
