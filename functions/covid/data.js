const requests = require('./requests')
const util = require('./utils')

let HUNDREDTH_DATE = {}

const daily_cases = async() => {
    let data = await requests.get_data()
    
    let confirmed = []
    let deaths = []
    let recovered = []

    //Consider from the time when India confirmed its 100th case
    let date = ""
    let date_set = false

    data.cases_time_series.forEach(cases => {

        if(parseInt(cases.totalconfirmed) >= 100) {

            if (!date_set) {
                date = cases.date
                date_set = true
            }

            let date_ = cases.date

            let month = parseInt(util.month_number(date_.split(' ')[1]))
            let day = parseInt(date_.split(' ')[0])

            date_ = {day: day, month: month}
            
            let case_ = {postitive: cases.dailyconfirmed, date: date_}
            let death = {death: cases.dailydeceased, date: date_}
            let recovery = {recovered: cases.dailyrecovered, date: date_}
            
            confirmed.push(case_)
            deaths.push(death)
            recovered.push(recovery)
        }
    })

    let month = date.split(' ')[1]
    let day = parseInt(date.split(' ')[0])

    HUNDREDTH_DATE.day = day
    HUNDREDTH_DATE.month = util.month_number(month)

    console.log(`100th confirmed case on ${HUNDREDTH_DATE.day} ${HUNDREDTH_DATE.month}`)

    return {

        daily: {
            positive: confirmed,
            deaths: deaths,
            recovered: recovered
        }
    }
    
}

module.exports.daily_growth_rates = async () => {

    let daily_data = await daily_cases()
    

}

module.exports.test_series = async () => {

    try {
        let response = await requests.get_data()
        let tested = response.tested
        
        let cumulative_samples = []

        let daily = await daily_cases()

        tested.forEach(test => {

            let date = util.parse_timestamp(test.updatetimestamp)
        
            let start = false

            if(date.month >= parseInt(HUNDREDTH_DATE.month) && date.day >= parseInt(HUNDREDTH_DATE.day)) {
                //console.log(`Start date ${JSON.stringify(date)}`)
                start = true 
            }

            if(start) {
                let samples_tesed = parseInt(test.totalsamplestested)
                
                if(samples_tesed) {
                    let sample = {total_samples: parseInt(test.totalsamplestested), date: date}
                    cumulative_samples.push(sample)
                } 
            }
        })

        console.log(cumulative_samples)

        console.log(daily.daily.positive)
        console.log(cumulative_samples.length)

    } catch(error) {
        console.log(error)
        throw error
    }

}

const main = async () => {
    let data = await daily_cases()
    console.log(data)

    let tests = await this.test_series()
    console.log(tests)
}

main()