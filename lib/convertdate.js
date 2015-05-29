var moment = require('moment');

var convert = function(str) {
    date = str.toLocaleLowerCase();
    //start and find out it date is current day
    switch (date) {
        case 'sunday':
            return moment().weekday(0);
        case 'monday':
            return moment().weekday(-6);
        case 'tuesday':
            return moment().weekday(-5);
        case 'wednesday':
            return moment().weekday(-4);
        case 'thursday':
            return moment().weekday(-3);
        case 'friday':
            console.log('yup');
            return moment().weekday(-2);
        case 'saturday':
            return moment().weekday(-1);
        case 'yesterday':
            return moment().subtract(1, 'day');
        case 'today':
            return moment();
        default:
            return moment(date, ["MM-DD-YYYY", "MMM-DD-YYYY", "DD-MM-YYYY"], 'en');
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
module.exports.chunk = chunk;