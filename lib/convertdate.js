var moment = require('moment');

var convert = function(str) {
    date = str.toLocaleLowerCase().trim();
    switch (date) {
        case '':
            return [moment().subtract(100, 'year'), 'chunk'];
        case 'last':
            return [null, 'last'];
        case 'this week':
            return [moment().startOf('week'), 'chunk'];
        case 'this month':
            return [moment().startOf('month'), 'chunk'];
        case 'this year':
            return [moment().startOf('year'), 'chunk'];
        case 'today':
        case moment().format('dddd').toLocaleLowerCase():
            return [moment(), 'date'];
        case 'sunday':
            return [moment().weekday(0), 'date'];
        case 'monday':
            return [moment().weekday(-6), 'date'];
        case 'tuesday':
            return [moment().weekday(-5), 'date'];
        case 'wednesday':
            return [moment().weekday(-4), 'date'];
        case 'thursday':
            return [moment().weekday(-3), 'date'];
        case 'friday':
            return [moment().weekday(-2), 'date'];
        case 'saturday':
            return [moment().weekday(-1), 'date'];
        case 'yesterday':
            return [moment().subtract(1, 'day'), 'date'];
        default:
            return [moment(date, ["MM-DD-YYYY", "MMM-DD-YYYY", "DD-MM-YYYY"], 'en'), 'date'];
    }
};


var chunk = function(str){
    var date = str.toLocaleLowerCase();
    switch (date) {
        case '':
            return moment().subtract(100, 'year');
        case 'this week':
            return moment().startOf('week');
        case 'this month':
            return moment().startOf('month');
        case 'this year':
            return moment().startOf('year');
        default:
            console.log('you must enter a valid date')
    }
};


module.exports.convert = convert;
