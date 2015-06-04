var chalk = require('chalk');
var config = require('./config');
var ui = require('./ui');
var colors = require ('./writecolor');
var write = colors.current_theme();

var default_action = function(){
    if (config.checkconfig()) {
        ui.delimiter();
        ui.header('hi...welcome');
        write.log('i see that you\'re new here. ' +
        '\nenter:  ' + chalk.inverse('<<dear-diary setup>>') + '  to begin');
    } else {
        write.log('hi ' + config.name() + '...it\'s good to see you again. ' +
        '\nenter:  ' + chalk.inverse('<<dear-diary --help>>') + '  if you\'d like to see available commands')
    }
};

module.exports = default_action;