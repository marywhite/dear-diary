var chalk = require('chalk')
    , config = require('./config')
    , ui = require('./ui')
    , colors = require ('./writecolor')
    , write = colors.current_theme();

var default_action = function(){
    if (config.checkconfig()) {
        ui.delimiter();
        ui.header('hi...welcome');
        ui.delimiter();
        write.log('i see that you\'re new here. ' +
        '\nenter:  ' + chalk.inverse('<<dear-diary setup>>') + '  to begin');
    } else {
        write.log('hi ' + config.name() + '...it\'s good to see you again. ' +
        '\nenter:  ' + chalk.inverse('<<dear-diary --help>>') + '  if you\'d like to see available commands')
    }
};

module.exports = default_action;