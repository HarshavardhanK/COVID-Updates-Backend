
//Scaling the date from when India confirmed its 100th case

exports.day_scaling = (month) => {
    let scale = {"01": 31, "02": 28, "03": 31, "04": 30, "05": 31, 
                "06": 30, "07": 31, "08": 31, "09": 30, 10: 31, 11: 30, 12: 31}
    //taking non leap since 2020 February since only China was adding numbers at that time

    return scale[month]
}

exports.month_number = (month) => {
    
    let months = {
        "January" : "01",
        "February": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12"
    }

    return months[month]
}

exports.parse_timestamp = (timestamp) => {
    let times = timestamp.split(' ')
    let date = times[0]

    let slices = date.split('/')
    let day = slices[0]
    let month = slices[1]

    return {day: parseInt(day), month: parseInt(month)}
}