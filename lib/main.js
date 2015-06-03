var program = require('commander');
var setup = require('./setup');
var unlock = require('./unlock');
var config = require('./config');
var forgotpw = require('./forgotpw');
var default_action = require('./default');

//how many diary entries

//localhost?!?!

program
    .version(require('../package.json').version)
    .parse(process.argv);

//create a function to detect whether a user has entered setup
if (!process.argv.slice(2).length) {
    default_action();
}

program
    .command('change password')
    .action(function(){
        forgotpw();
    });


program
    .command('setup')
    .action(function(){
        unlock.validation(setup.ask, setup.ask);
    });

program
    .command('create')
    .action(function(){
        unlock.validation(unlock.submit, unlock.notifysetup);
    });

program
    .command('display')
    .action(function(){
        unlock.validation(unlock.read, unlock.notifysetup);
    });

program
    .command('delete')
    .action(function(){
        unlock.validation(unlock.burn, unlock.notifysetup);
    });
//
program
    .action(function(){
        console.log('hi, welcome.');
    });

program.parse(process.argv);
