var moment = require('moment');


var convert = function(str) {
    date = str.toLocaleLowerCase().trim();
    switch (date) {
        case '':
        case 'all':
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
            return [moment(), 'date'];
        case 'yesterday':
            return [moment().subtract(1, 'day'), 'date'];
        case 'sunday':
        case 'monday':
        case 'tuesday':
        case 'wednesday':
        case 'thursday':
        case 'friday':
        case 'saturday':
            return [moment().day(date), 'date'];
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
    }
};


module.exports.convert = convert;
