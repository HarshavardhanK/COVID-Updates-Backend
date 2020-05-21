const requests = require('./requests')
const util = require('./utils')

let HUNDREDTH_DATE = {}

const daily_cases = async() => {
    let data = await requests.get_data()
    
    let confirmed = []
    let deaths = []
    let recovered = []

    let cumulative_confirmed = []
    let cumulative_deaths = []
    let cumulative_recovered = []

    //Consider from the time when India confirmed its 100th case
    let date = ""
    let date_set = false

    data.cases_time_series.forEach(cases => {

        if(parseInt(cases.totalconfirmed) >= 100) {

            if (!date_set) {
                date = cases.date
                date_set = true
            }
            
            confirmed.push(cases.dailyconfirmed)
            deaths.push(cases.dailydeceased)
            recovered.push(cases.dailyrecovered)

            cumulative_confirmed.push(cases.totalconfirmed)
            cumulative_deaths.push(cases.totaldeceased)
            cumulative_recovered.push(cases.totalrecovered)
        }
    })

    let month = date.split(' ')[1]
    let day = parseInt(date.split(' ')[0])

    HUNDREDTH_DATE.DAY = day
    HUNDREDTH_DATE.MONTH = month

    console.log(`100th confirmed case on ${HUNDREDTH_DATE.DAY} ${HUNDREDTH_DATE.MONTH}`)

    return {

        daily: {
            positive: confirmed,
            deaths: deaths,
            recovered: recovered
        },

        cumulative: {
            positive: cumulative_confirmed,
            deaths: cumulative_deaths,
            recovered: cumulative_recovered
        }
    }
    
}

const daily_growth_rates = async () => {

    let daily_data = await daily_cases()
    

}

const main = async () => {
    let data = await daily_cases()
    console.log(data)
}

main()