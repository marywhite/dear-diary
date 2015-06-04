var config = require('./config');
var ui = require('./ui')

var default_action = function(){
    if (config.checkconfig()) {
        ui.delimiter();
        ui.header('hi...welcome');
        ui.delimiter();
        console.log('i see that you\'re new here. ' +
        '\ntype <<dear diary setup>> to begin')
    } else {
        console.log('hi ' + config.name() +
        '...it\'s good to see you again. ' +
        '\ntype <<dear-diary help>> if you\'d like to see available commands')
    }
};

module.exports = default_action;