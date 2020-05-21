exports.format_number = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//console.log(this.format_number(100000))
